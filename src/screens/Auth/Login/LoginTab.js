import React from 'react';
import {Text, View} from 'react-native';

import {ButtonRounded, TextButton, TextInputFloatingLabel} from 'components';

import styles from './styles';
import * as RootNavigator from 'navigator/rootNavigator';
import I18n from 'i18n';
import _ from 'lodash';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';
import {Eye, EyeShow, Phone} from 'svg/common';

import {emailRegex, passwordRegex} from 'utils/common';

import asyncStorage from 'data/asyncStorage';

const LoginTab = () => {
  //Initial States
  const [email, setEmail] = React.useState('');
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [errEmailMsg, setErrEmailMsg] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [errPasswordMsg, setErrPasswordMsg] = React.useState('');
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(false);
  const [isShowErrMsg, toggleShowErrMsg] = React.useState(false);
  const [isFocusEmailInput, setFocusEmailInput] = React.useState(false);
  const [isFocusPasswordInput, setFocusPasswordInput] = React.useState(false);
  const [isShowPasswordErrMsg, toggleShowPasswordErrMsg] = React.useState(
    false,
  );

  //useEffect
  React.useEffect(() => {
    async function getUserName() {
      let data = await asyncStorage.getUserName();
      setEmail(data.username);
    }
    getUserName();
  }, []);

  //useEffect
  React.useEffect(() => {
    if (
      invalidEmail ||
      invalidPassword ||
      _.isEmpty(email) ||
      _.isEmpty(password)
    ) {
      setDisabledLoginBtn(true);
    } else {
      setDisabledLoginBtn(false);
    }
  }, [invalidEmail, invalidPassword, email, password]);

  //Dispatch Redux
  const dispatch = useDispatch();

  //textInput
  const onChangeEmail = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (emailRegex.test(value) === false) {
        setEmail(value);
        setInvalidEmail(true);
        setErrEmailMsg(I18n.t('invalidEmail'));
        toggleShowErrMsg(false);
        return false;
      } else {
        //email hợp lệ
        setEmail(value.toLowerCase());
        setInvalidEmail(false);
        setErrEmailMsg('');
      }
    } else {
      //nếu textInput rỗng
      setEmail(value);
      setInvalidEmail(false);
      setErrEmailMsg('');
    }
  };

  const onBlurEmailInput = () => {
    if (invalidEmail) {
      toggleShowErrMsg(true);
    }
    setFocusEmailInput(false);
  };

  const onFocusEmailInput = () => {
    setFocusEmailInput(true);
  };

  const onFocusPasswordInput = () => {
    setFocusPasswordInput(true);
  };

  const onBlurPasswordInput = () => {
    if (invalidPassword) {
      toggleShowPasswordErrMsg(true);
    }
    setFocusPasswordInput(false);
  };

  const onChangePassword = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (passwordRegex.test(value) === false) {
        setPassword(value);
        setInvalidPassword(true);
        setErrPasswordMsg(I18n.t('invalidPassword'));
        toggleShowPasswordErrMsg(false);
        return false;
      } else {
        //email hợp lệ
        setPassword(value);
        setInvalidPassword(false);
        setErrPasswordMsg('');
      }
    } else {
      //nếu textInput rỗng
      setPassword(value);
      setInvalidPassword(false);
      setErrPasswordMsg('');
    }
  };

  //handle funcs
  const onLoginWithPhone = () => {
    RootNavigator.navigate('LoginViaPhone');
  };
  const onForgotPw = () => {
    RootNavigator.navigate('ForgotPassword');
  };

  //handle User login
  const onLogin = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userLogin({
        email,
        password,
        onSuccess: () => onLoginSuccess(),
      }),
    );
  };

  const onLoginSuccess = async () => {
    dispatch(commonActions.toggleLoading(false));
  };

  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputFloatingLabel
          value={email}
          placeholder={I18n.t('email')}
          onChangeText={(text) => onChangeEmail(text)}
          keyboardType="email-address"
          onBlur={() => onBlurEmailInput()}
          onFocus={() => onFocusEmailInput()}
          isFocused={isFocusEmailInput}
        />
        {isShowErrMsg && invalidEmail && (
          <Text style={styles.errMsg}>{errEmailMsg}</Text>
        )}
        <TextInputFloatingLabel
          value={password}
          placeholder={I18n.t('password')}
          onChangeText={(text) => onChangePassword(text)}
          iconShow={<EyeShow />}
          iconHide={<Eye />}
          secureTextEntry={true}
          onBlur={() => onBlurPasswordInput()}
          onFocus={() => onFocusPasswordInput()}
          isFocused={isFocusPasswordInput}
        />
        {isShowPasswordErrMsg && invalidPassword && (
          <Text style={styles.errMsg}>{errPasswordMsg}</Text>
        )}
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onLogin()}
            label={I18n.t('login')}
            disabled={disabledLoginBtn}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            icon={({size, color}) => <Phone />}
            onPress={() => onLoginWithPhone()}
            labelStyle={styles.iconTextLabel}
            label={I18n.t('loginWithPhone')}
          />
        </View>
        <View>
          <TextButton
            onPress={() => onForgotPw()}
            labelStyle={styles.labelBtn}
            label={I18n.t('forgotPassword')}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginTab;
