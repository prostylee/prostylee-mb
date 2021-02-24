import React from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  ButtonRounded,
  TextInputFloatingLabel,
  HeaderBack,
} from 'components';

import _ from 'lodash';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';

import I18n from 'i18n';

const Index = (props) => {
  //Initial States
  const [email, setEmail] = React.useState('');
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [errEmailMsg, setErrEmailMsg] = React.useState('');
  const [disabledBtn, setDisabledBtn] = React.useState(false);
  const [isShowErrMsg, toggleShowErrMsg] = React.useState(false);
  const [isFocusEmailInput, setFocusEmailInput] = React.useState(true);

  //useEffect
  React.useEffect(() => {
    if (invalidEmail || _.isEmpty(email)) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [invalidEmail, email]);

  //Dispatch Redux
  const dispatch = useDispatch();

  //textInput
  const onChangeEmail = async (value) => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (reg.test(value) === false) {
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

  //handle User login
  const onSubmitEmail = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userForgotPassword({
        email,
        onSuccess: () => onUserForgotPasswordSuccess(),
      }),
    );
  };

  const onUserForgotPasswordSuccess = async () => {
    await dispatch(commonActions.toggleLoading(false));
    props.navigation.navigate('OTPVerification', {email});
  };

  const onGoBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('forgotPassword')}
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>
            <TextInputFloatingLabel
              placeholder={I18n.t('emailOrPhone')}
              value={email}
              onChangeText={(text) => onChangeEmail(text)}
              autoFocus={true}
              keyboardType="email-address"
              onBlur={() => onBlurEmailInput()}
              onFocus={() => onFocusEmailInput()}
              isFocused={isFocusEmailInput}
            />
            {isShowErrMsg && invalidEmail && (
              <Text style={styles.errMsg}>{errEmailMsg}</Text>
            )}
            <View style={styles.btnWrapper}>
              <ButtonRounded
                label={I18n.t('next')}
                onPress={() => onSubmitEmail()}
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
