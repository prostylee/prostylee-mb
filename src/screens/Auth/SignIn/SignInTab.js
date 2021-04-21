import React, {useState} from 'react';
import {View} from 'react-native';

import {ButtonRounded, TextButton} from 'components';

import styles from './styles';
import I18n from 'i18n';

import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';
import {Phone} from 'svg/common';

import RootNavigator from '../../../navigator/rootNavigator';
import {showMessage} from 'react-native-flash-message';
import {UNKNOWN_MESSAGE} from 'constants';
import authService from '../../../services/authService';

import {Field, Formik} from 'formik';
import {CustomSecureInput, CustomTextInput} from '../../../components';
import {validateEmail, validatePassword} from '../../../utils/validatorUtils';

const SignInTab = () => {
  const [cachedUsername, setCachedUsername] = useState('');

  React.useEffect(() => {
    const userData = authService.getUserName();
    setCachedUsername(userData ? userData.username : '');
  }, [cachedUsername]);

  //Dispatch Redux
  const dispatch = useDispatch();

  //handle funcs
  const onSignInWithPhone = () => {
    RootNavigator.navigate('SignInViaPhone');
  };

  const onForgotPw = () => {
    RootNavigator.navigate('ForgotPassword');
  };

  //handle User signIn
  const onSignIn = async (formValues) => {
    console.log('onSignIn: ' + JSON.stringify(formValues));
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userSignIn({
        email: formValues.email,
        password: formValues.password,
        onSuccess: () => onSignInSuccess(),
        onFail: (errorCode) => onSignInFail(formValues, errorCode),
      }),
    );
  };

  const onSignInFail = (formValues, errorCode) => {
    dispatch(commonActions.toggleLoading(false));
    let errorMessage = UNKNOWN_MESSAGE;
    if (errorCode === 'UserNotConfirmedException') {
      RootNavigator.navigate('SignUpOTPVerification', {
        email: formValues.email,
      });
      errorMessage = I18n.t('userNeedToVerify');
    } else if (
      errorCode === 'UserNotFoundException' ||
      errorCode === 'NotAuthorizedException'
    ) {
      errorMessage = I18n.t('incorrectEmailOrPassword');
    }
    showMessage({
      message: errorMessage,
      type: 'danger',
    });
  };

  const onSignInSuccess = async () => {
    dispatch(commonActions.toggleLoading(false));
  };

  return (
    <View style={styles.tabViewWrapper}>
      <Formik
        validateOnMount={true}
        initialValues={{email: cachedUsername, password: ''}}
        onSubmit={(values) => onSignIn(values)}>
        {({handleSubmit, values, isValid}) => (
          <View style={styles.form}>
            <Field
              component={CustomTextInput}
              validate={validateEmail}
              name="email"
              label={I18n.t('email')}
              keyboardType="email-address"
            />

            <Field
              component={CustomSecureInput}
              validate={validatePassword}
              name="password"
              label={I18n.t('password')}
            />

            <View style={styles.btnWrapper}>
              <ButtonRounded
                onPress={handleSubmit}
                label={I18n.t('signIn')}
                disabled={
                  !isValid || values.email === '' || values.password === ''
                }
              />
            </View>

            <View style={styles.btnWrapper}>
              <TextButton
                icon={() => <Phone />}
                onPress={onSignInWithPhone}
                labelStyle={styles.iconTextLabel}
                label={I18n.t('signInWithPhone')}
              />
            </View>

            <View>
              <TextButton
                onPress={onForgotPw}
                labelStyle={styles.labelBtn}
                label={I18n.t('forgotPassword')}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignInTab;
