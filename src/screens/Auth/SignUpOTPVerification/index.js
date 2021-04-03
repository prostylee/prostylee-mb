import React from 'react';
import {Text, View} from 'react-native';
import {
  ButtonRounded,
  ContainerWithoutScrollView,
  HeaderBack,
  TextButton,
} from 'components';

import I18n from 'i18n';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import RootNavigator from '../../../navigator/rootNavigator';

const TIME = 10; // TODO 60
const CODE_LENGTH = 6;

const Index = (props) => {
  //State
  const [code, setCode] = React.useState('');
  const [isDisabledBtn, setDisabledBtn] = React.useState(true);
  const [timeLeft, setTimeLeft] = React.useState(TIME);

  //Ref
  const inputRef = React.useRef(null);
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  });

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

  //dispatch
  const dispatch = useDispatch();

  //Back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //input
  const onChangeCode = (text) => {
    setCode(text);
    if (text.length === CODE_LENGTH) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const onVerifyOTP = async () => {
    console.log('onVerifyOTP ' + props.route.params.email);
    await dispatch(commonActions.toggleLoading(true));
    dispatch(
      userActions.userVerifyOTP({
        email: props.route.params.email,
        otp: code,
        onSuccess: () => onVerifyOTPSuccess(),
        onFail: () => onVerifyOTPFail(),
      }),
    );
  };

  const onVerifyOTPSuccess = async () => {
    await dispatch(commonActions.toggleLoading(false));
    await clearInterval(intervalRef.current);
    await setTimeLeft(0);
    RootNavigator.navigate('SignIn', {index: 0});
  };

  const onVerifyOTPFail = async () => {
    await dispatch(commonActions.toggleLoading(false));
    showMessage({
      message: I18n.t('invalidOTP'),
      type: 'danger',
    });
  };

  const onResendOTP = async () => {
    console.log('onResendOTP ' + props.route.params.email);
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.resendOtpSignUp({
        email: props.route.params.email,
        onSuccess: () => onResendOTPSuccess(),
      }),
    );
  };

  const onResendOTPSuccess = async () => {
    console.log('onResendOTPSuccess ' + props.route.params.email);
    await dispatch(commonActions.toggleLoading(false));
    showMessage({
      message: I18n.t('resendOTPSuccess'),
      type: 'success',
    });
    setTimeLeft(TIME);
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('enterOTP')} onBack={() => onGoBack()} />
          <View style={styles.form}>
            <Text style={styles.label}>{I18n.t('otpSent')}</Text>
            <Text style={styles.phone}>{props.route.params.email}</Text>
            <SmoothPinCodeInput
              ref={inputRef}
              cellStyle={styles.cellStyle}
              cellStyleFocused={styles.cellStyleFocused}
              textStyle={styles.textStyle}
              textStyleFocused={styles.textStyleFocused}
              cellSpacing={8}
              codeLength={CODE_LENGTH}
              autoFocus={true}
              onFulfill={() => {}}
              value={code}
              onTextChange={(value) => onChangeCode(value)}
            />
            <ButtonRounded
              label={I18n.t('next')}
              style={styles.button}
              onPress={() => onVerifyOTP()}
              disabled={isDisabledBtn}
            />
          </View>
          <View style={styles.btnWrapper}>
            <TextButton
              label={I18n.t('resendOTP')}
              labelStyle={styles.labelTextButton}
              onPress={() => onResendOTP()}
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