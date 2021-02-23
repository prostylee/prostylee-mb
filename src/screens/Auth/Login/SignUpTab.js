import React from 'react';
import {Text, View} from 'react-native';

import {ButtonRounded, TextButton, TextInputFloatingLabel} from 'components';

import styles from './styles';
import * as RootNavigator from 'navigator/rootNavigator';
import I18n from 'i18n';
import _ from 'lodash';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';
import {Eye, Phone} from 'svg/common';

import {emailRegex, passwordRegex, fullNameRegex} from 'utils/common';

const SignupTab = () => {
  //Initial States
  const [fullname, setFullname] = React.useState('');
  const [invalidFullname, setInvalidFullname] = React.useState(false);
  const [errFullnameMsg, setErrFullnameMsg] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [errEmailMsg, setErrEmailMsg] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [errPasswordMsg, setErrPasswordMsg] = React.useState('');
  const [disabledSignUpBtn, setDisabledSignUpBtn] = React.useState(false);
  const [isShowFullNameErrMsg, toggleShowFullNameErrMsg] = React.useState(
    false,
  );
  const [isShowEmailErrMsg, toggleShowEmailErrMsg] = React.useState(false);
  const [isShowPasswordErrMsg, toggleShowPasswordErrMsg] = React.useState(
    false,
  );
  const [isFocusFullNameInput, setFocusFullNameInput] = React.useState(false);
  const [isFocusEmailInput, setFocusEmailInput] = React.useState(false);
  const [isFocusPasswordInput, setFocusPasswordInput] = React.useState(false);

  //useEffect
  React.useEffect(() => {
    if (
      invalidEmail ||
      invalidPassword ||
      invalidFullname ||
      _.isEmpty(email) ||
      _.isEmpty(fullname) ||
      _.isEmpty(password)
    ) {
      setDisabledSignUpBtn(true);
    } else {
      setDisabledSignUpBtn(false);
    }
  }, [
    invalidEmail,
    invalidPassword,
    invalidFullname,
    fullname,
    email,
    password,
  ]);

  //Dispatch Redux
  const dispatch = useDispatch();

  //textInput
  const onChangeFullname = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (fullNameRegex.test(value) === false) {
        setFullname(value);
        setInvalidFullname(true);
        setErrFullnameMsg(I18n.t('invalidFullname'));
        toggleShowFullNameErrMsg(false);
        return false;
      } else {
        //email hợp lệ
        setFullname(value);
        setInvalidFullname(false);
        setErrFullnameMsg('');
      }
    } else {
      //nếu textInput rỗng
      setFullname(value);
      setInvalidFullname(false);
      setErrFullnameMsg('');
    }
  };

  const onBlurFullNameInput = () => {
    if (invalidFullname) {
      toggleShowFullNameErrMsg(true);
    }
    setFocusFullNameInput(false);
  };

  const onFocusFullNameInput = () => {
    setFocusFullNameInput(true);
  };

  const onChangeEmail = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (emailRegex.test(value) === false) {
        setEmail(value);
        setInvalidEmail(true);
        setErrEmailMsg(I18n.t('invalidEmail'));
        toggleShowEmailErrMsg(false);
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
      toggleShowEmailErrMsg(true);
    }
    setFocusEmailInput(false);
  };

  const onFocusEmailInput = () => {
    setFocusEmailInput(true);
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

  const onBlurPasswordInput = () => {
    if (invalidPassword) {
      toggleShowPasswordErrMsg(true);
    }
    setFocusPasswordInput(false);
  };

  const onFocusPasswordInput = () => {
    setFocusPasswordInput(true);
  };

  //handle funcs
  const onSignUpWithPhone = () => {
    RootNavigator.navigate('SignUpViaPhone');
  };
  //handle User login
  const onSignUp = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userSignUp({
        fullname,
        email,
        password,
        onSuccess: () => onSignUpSuccess(),
      }),
    );
  };

  const onSignUpSuccess = async () => {
    dispatch(commonActions.toggleLoading(false));
  };
  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputFloatingLabel
          placeholder={I18n.t('fullname')}
          value={fullname}
          onChangeText={(text) => onChangeFullname(text)}
          textInputStyle={styles.textInput}
          onBlur={() => onBlurFullNameInput()}
          onFocus={() => onFocusFullNameInput()}
          isFocused={isFocusFullNameInput}
        />
        {isShowFullNameErrMsg && invalidFullname && (
          <Text style={styles.errMsg}>{errFullnameMsg}</Text>
        )}
        <TextInputFloatingLabel
          placeholder={I18n.t('email')}
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
          textInputStyle={styles.textInput}
          keyboardType="email-address"
          onBlur={() => onBlurEmailInput()}
          onFocus={() => onFocusEmailInput()}
          isFocused={isFocusEmailInput}
        />
        {isShowEmailErrMsg && invalidEmail && (
          <Text style={styles.errMsg}>{errEmailMsg}</Text>
        )}
        <TextInputFloatingLabel
          placeholder={I18n.t('password')}
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          textInputStyle={styles.textInput}
          iconShow={<Eye />}
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
            onPress={() => onSignUp()}
            label={I18n.t('signUp')}
            disabled={disabledSignUpBtn}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            icon={({size, color}) => <Phone />}
            onPress={() => onSignUpWithPhone()}
            labelStyle={styles.iconTextLabel}
            label={I18n.t('signUpWithPhone')}
          />
        </View>
      </View>
    </View>
  );
};

export default SignupTab;
