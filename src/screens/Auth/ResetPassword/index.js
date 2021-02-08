import React from 'react';
import {View, Text} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputBorderBottom,
  HeaderBack,
} from 'components';

import I18n from 'i18n';
import _ from 'lodash';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';

//ICONS
const IC_EYE = require('assets/icons/eye.png');

const Index = (props) => {
  //Initial States
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [errPasswordMsg, setErrPasswordMsg] = React.useState('');
  const [disabledBtn, setDisabledBtn] = React.useState(false);
  const [isVisiblePw, setVisiblePw] = React.useState(true);

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

  const onTogglePasswordVisibility = () => {
    setVisiblePw(!isVisiblePw);
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
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('resetPw')} onBack={() => onGoBack()} />
          <View style={styles.form}>
            <TextInputBorderBottom
              hint={I18n.t('yourNewPw')}
              value={password}
              onChangeText={(text) => onChangePassword(text)}
              textInputStyle={styles.textInput}
              autoFocus={true}
              icon={IC_EYE}
              secureTextEntry={isVisiblePw}
              onPressIcon={() => onTogglePasswordVisibility()}
            />
            {invalidPassword && (
              <Text style={styles.errMsg}>{errPasswordMsg}</Text>
            )}
            <ButtonRounded
              label={I18n.t('nextVn')}
              style={styles.button}
              onPress={() => onUpdateNewPassword()}
              disabled={disabledBtn}
            />
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
