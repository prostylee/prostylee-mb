import React from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  ButtonRounded,
  TextInputFloatingLabel,
  HeaderBack,
} from 'components';

import I18n from 'i18n';
import _ from 'lodash';

import {Eye} from 'svg/common';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';

const Index = (props) => {
  //Initial States
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [errPasswordMsg, setErrPasswordMsg] = React.useState('');
  const [disabledBtn, setDisabledBtn] = React.useState(false);
  const [isFocusPasswordInput, setFocusPasswordInput] = React.useState(true);
  const [isShowErrMsg, toggleShowErrMsg] = React.useState(true);

  //useEffect
  React.useEffect(() => {
    if (invalidPassword || _.isEmpty(password)) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [invalidPassword, password]);

  //Dispatch Redux
  const dispatch = useDispatch();

  const onGoBack = () => {
    props.navigation.goBack();
  };

  //input
  const onChangePassword = async (value) => {
    let reg = /^.{4,50}$/;
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (reg.test(value) === false) {
        setPassword(value);
        setInvalidPassword(true);
        setErrPasswordMsg(I18n.t('invalidPassword'));
        toggleShowErrMsg(false);
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
      toggleShowErrMsg(true);
    }
    setFocusPasswordInput(false);
  };

  const onFocusPasswordInput = () => {
    setFocusPasswordInput(true);
  };

  const onUpdateNewPassword = async () => {
    await dispatch(commonActions.toggleLoading(true));
    console.log(props.route);
    dispatch(
      userActions.userChangePassword({
        email: props.route.params.email,
        password: props.route.params.otp,
        newPassword: password,
        onSuccess: () => onUpdateNewPasswordSuccess(),
      }),
    );
  };

  const onUpdateNewPasswordSuccess = async () => {
    await dispatch(commonActions.toggleLoading(false));
    props.navigation.navigate('ResetPasswordViaMail');
  };
  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('resetPw')} onBack={() => onGoBack()} />
          <View style={styles.form}>
            <TextInputFloatingLabel
              placeholder={I18n.t('yourNewPw')}
              value={password}
              onChangeText={(text) => onChangePassword(text)}
              autoFocus={true}
              iconShow={<Eye />}
              iconHide={<Eye />}
              secureTextEntry={true}
              onBlur={() => onBlurPasswordInput()}
              onFocus={() => onFocusPasswordInput()}
              isFocused={isFocusPasswordInput}
            />
            {isShowErrMsg && invalidPassword && (
              <Text style={styles.errMsg}>{errPasswordMsg}</Text>
            )}
            <View style={styles.btnWrapper}>
              <ButtonRounded
                label={I18n.t('next')}
                onPress={() => onUpdateNewPassword()}
                disabled={disabledBtn}
              />
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Index;
