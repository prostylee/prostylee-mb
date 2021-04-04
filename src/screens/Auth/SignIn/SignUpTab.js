import React, {useState} from 'react';
import {View} from 'react-native';

import {
  ButtonRounded,
  TextButton,
  TextInputFloatingLabel,
} from '../../../components';

import styles from './styles';
import I18n from '../../../i18n';
import _ from 'lodash';

import {useDispatch} from 'react-redux';
import {Phone} from '../../../svg/common';

import {emailRegex, fullNameRegex, passwordRegex} from '../../../utils/common';
import RootNavigator from '../../../navigator/rootNavigator';
import {commonActions, userActions} from '../../../redux/reducers';
import SecureInput from '../../../components/SecureInput';

const SignupTab = () => {
  const [fullname, setFullname] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  //Dispatch Redux
  const dispatch = useDispatch();

  //textInput
  const onChangeFullname = async (value) => {
    if (_.isEmpty(value)) {
      setFullname({
        value: '',
        error: I18n.t('validation.required', {field: I18n.t('user.name')}),
      });
    } else if (fullNameRegex.test(value) === false) {
      setFullname({
        value: value,
        error: I18n.t('validation.invalid', {field: I18n.t('user.name')}),
      });
    } else {
      setFullname({value: value, error: ''});
    }
  };

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

  const onSignUpWithPhone = () => {
    RootNavigator.navigate('SignUpViaPhone');
  };

  const onSignUp = async () => {
    console.log('onSignUp');
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userSignUp({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        onSuccess: () => onSignUpSuccess(),
      }),
    );
  };

  const onSignUpSuccess = async () => {
    console.log('onSignUpSuccess');
    dispatch(commonActions.toggleLoading(false));
    RootNavigator.navigate('SignUpOTPVerification', {email: email.value});
  };

  const isDisabledButton = () => {
    return !fullname.value || fullname.error || !email.value || email.error || !password.value || password.error;
  };

  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputFloatingLabel
          label={I18n.t('fullname')}
          value={fullname.value}
          onChangeText={onChangeFullname}
          error={!!fullname.error}
          errorText={fullname.error}
        />

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
            onPress={onSignUp}
            label={I18n.t('signUp')}
            disabled={isDisabledButton()}
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
    </View>
  );
};

export default SignupTab;
