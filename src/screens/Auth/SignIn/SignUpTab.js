import React from 'react';
import {View} from 'react-native';

import {
  ButtonRounded,
  CustomSecureInput,
  CustomTextInput,
  TextButton,
} from '../../../components';

import styles from './styles';
import I18n from '../../../i18n';

import {useDispatch} from 'react-redux';
import {Phone} from '../../../svg/common';
import RootNavigator from '../../../navigator/rootNavigator';
import {commonActions, userActions} from '../../../redux/reducers';
import {Field, Formik} from 'formik';
import {
  validateEmail,
  validateFullname,
  validatePassword,
} from '../../../utils/validatorUtils';

const SignupTab = () => {
  const dispatch = useDispatch();

  const onSignUpWithPhone = () => {
    RootNavigator.navigate('SignUpViaPhone');
  };

  const onSignUp = async (formValues) => {
    console.log('onSignUp');
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userSignUp({
        fullname: formValues.fullname,
        email: formValues.email,
        password: formValues.password,
        onSuccess: () => onSignUpSuccess(formValues),
      }),
    );
  };

  const onSignUpSuccess = async (formValues) => {
    console.log('onSignUpSuccess');
    dispatch(commonActions.toggleLoading(false));
    RootNavigator.navigate('SignUpOTPVerification', {email: formValues.email});
  };

  return (
    <View style={styles.tabViewWrapper}>
      <Formik
        validateOnMount={true}
        initialValues={{fullname: '', email: '', password: ''}}
        onSubmit={(values) => onSignUp(values)}>
        {({handleSubmit, values, isValid}) => (
          <View style={styles.form}>
            <Field
              component={CustomTextInput}
              validate={validateFullname}
              name="fullname"
              label={I18n.t('fullname')}
            />

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
                label={I18n.t('signUp')}
                disabled={
                  !isValid ||
                  values.fullname === '' ||
                  values.email === '' ||
                  values.password === ''
                }
              />
            </View>

            <View style={styles.btnWrapper}>
              <TextButton
                icon={() => <Phone />}
                onPress={onSignUpWithPhone}
                labelStyle={styles.iconTextLabel}
                label={I18n.t('signUpWithPhone')}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignupTab;
