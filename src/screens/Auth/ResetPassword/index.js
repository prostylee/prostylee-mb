import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ButtonRounded, HeaderBack, TextButton,} from 'components';

import I18n from 'i18n';
import _ from 'lodash';

import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {passwordRegex} from '../../../utils/common';
import {showMessage} from 'react-native-flash-message';
import SecureInput from '../../../components/SecureInput';
import {ContainerWithoutScrollView} from '../../../components';

const TIME = 10; // TODO 60
const CODE_LENGTH = 6;

const Index = (props) => {
  const [code, setCode] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [timeLeft, setTimeLeft] = React.useState(TIME);

  const dispatch = useDispatch();

  const onGoBack = () => {
    props.navigation.goBack();
  };

  const intervalRef = React.useRef(null);
  React.useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

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

  const onChangeCode = (value) => {
    setCode({value: value, error: ''});
  };

  const onUpdateNewPassword = async () => {
    console.log('onUpdateNewPassword: ' + code.value);
    await dispatch(commonActions.toggleLoading(true));
    dispatch(
      userActions.userChangePassword({
        email: props.route.params.email,
        password: code.value,
        newPassword: password.value,
        onSuccess: () => onUpdateNewPasswordSuccess(),
      }),
    );
  };

  const onUpdateNewPasswordSuccess = async () => {
    await dispatch(commonActions.toggleLoading(false));
    props.navigation.navigate('ResetPasswordViaMail');
  };

  const onResendPassword = async () => {
    console.log('onResendPassword ' + props.route.params.email);
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userForgotPassword({
        email: props.route.params.email,
        onSuccess: () => onUserForgotPasswordSuccess(),
      }),
    );
  };

  const onUserForgotPasswordSuccess = async () => {
    console.log('onResendOTPSuccess ' + props.route.params.email);
    await dispatch(commonActions.toggleLoading(false));
    showMessage({
      message: I18n.t('resendOTPSuccess'),
      type: 'success',
    });
    setTimeLeft(TIME);
  };

  const isDisabledButton = () => {
    return !code.value || code.error || !password.value || password.error;
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('resetPw')} onBack={() => onGoBack()} />

          <View style={styles.form}>
            <Text style={styles.label}>{I18n.t('otpSent')}</Text>
            <Text style={styles.phone}>{props.route.params.email}</Text>

            <Text style={{alignSelf: 'flex-start', marginTop: 10, marginBottom: 10, marginLeft: 12}}>{I18n.t('enterOTP')}</Text>
            <SmoothPinCodeInput
              cellStyle={styles.cellStyle}
              cellStyleFocused={styles.cellStyleFocused}
              textStyle={styles.textStyle}
              textStyleFocused={styles.textStyleFocused}
              cellSpacing={8}
              codeLength={CODE_LENGTH}
              autoFocus={true}
              onFulfill={() => {}}
              value={code.value}
              onTextChange={(value) => onChangeCode(value)}
            />

            <SecureInput
              label={I18n.t('yourNewPw')}
              value={password.value}
              onChangeText={onChangePassword}
              error={!!password.error}
              errorText={password.error}
            />

            <ButtonRounded
              label={I18n.t('next')}
              style={styles.button}
              onPress={() => onUpdateNewPassword()}
              disabled={isDisabledButton()}
            />

          </View>
          <View style={styles.btnWrapper}>
            <TextButton
              label={I18n.t('resendOTP')}
              labelStyle={styles.labelTextButton}
              onPress={() => onResendPassword()}
              disabled={timeLeft > 0}
            />
          </View>
          {timeLeft > 0 && (
            <Text style={styles.countDown}>{`(${I18n.t(
              'after',
            )} ${timeLeft}s)`}</Text>
          )}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
