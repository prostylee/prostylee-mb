import React, {useState} from 'react';
import {View} from 'react-native';

import {ButtonRounded, TextButton, TextInputFloatingLabel} from 'components';

import styles from './styles';
import I18n from 'i18n';
import _ from 'lodash';

import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';
import {Phone} from 'svg/common';

import {emailRegex, passwordRegex} from 'utils/common';

import RootNavigator from '../../../navigator/rootNavigator';
import SecureInput from '../../../components/SecureInput';
import {showMessage} from 'react-native-flash-message';
import {UNKNOWN_MESSAGE} from 'constants';
import authService from '../../../services/authService';

const SignInTab = () => {

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  //useEffect
  React.useEffect(() => {
    async function getUserName() {
      let data = await authService.getUserName();
      if (data) {
        setEmail({value: data.username, error: ''});
      }
    }

    getUserName();
  }, []);

  //Dispatch Redux
  const dispatch = useDispatch();

  const onChangeEmail = async (value) => {
    if (_.isEmpty(value)) {
      setEmail({
        value: '',
        error: I18n.t('validation.required', {field: I18n.t('user.email')}),
      });
    } else if (emailRegex.test(value) === false) {
      setEmail({
        value: value,
        error: I18n.t('validation.invalid', {field: I18n.t('user.email')}),
      });
    } else {
      setEmail({value: value.toLowerCase(), error: ''});
    }
  };

  const isDisabledButton = () => {
    return !email.value || email.error || !password.value || password.error;
  };

  const onChangePassword = async (value) => {
    if (_.isEmpty(value)) {
      setPassword({
        value: '',
        error: I18n.t('validation.required', {field: I18n.t('user.password')}),
      });
    } else if (passwordRegex.test(value) === false) {
      setPassword({
        value: value,
        error: I18n.t('validation.invalid', {field: I18n.t('user.password')}),
      });
    } else {
      setPassword({value: value, error: ''});
    }
  };

  //handle funcs
  const onSignInWithPhone = () => {
    RootNavigator.navigate('SignInViaPhone');
  };

  const onForgotPw = () => {
    RootNavigator.navigate('ForgotPassword');
  };

  //handle User signIn
  const onSignIn = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userSignIn({
        email: email.value,
        password: password.value,
        onSuccess: () => onSignInSuccess(),
        onFail: (errorCode) => onSignInFail(errorCode),
      }),
    );
  };

  const onSignInFail = (errorCode) => {
    dispatch(commonActions.toggleLoading(false));
    let errorMessage = UNKNOWN_MESSAGE;
    if (errorCode === 'UserNotConfirmedException') {
      RootNavigator.navigate('SignUpOTPVerification', {email: email.value});
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
      <View style={styles.form}>
        <TextInputFloatingLabel
          label={I18n.t('email')}
          value={email.value}
          onChangeText={onChangeEmail}
          error={!!email.error}
          errorText={email.error}
        />

        <SecureInput
          label={I18n.t('password')}
          value={password.value}
          onChangeText={onChangePassword}
          error={!!password.error}
          errorText={password.error}
        />

        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onSignIn()}
            label={I18n.t('signIn')}
            disabled={isDisabledButton()}
          />
        </View>

        <View style={styles.btnWrapper}>
          <TextButton
            icon={() => <Phone/>}
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
    </View>
  );
};

export default SignInTab;
