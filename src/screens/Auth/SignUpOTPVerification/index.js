import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ButtonRounded, ContainerWithoutScrollView, HeaderBack, TextButton} from 'components';

import I18n from 'i18n';
import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import RootNavigator from '../../../navigator/rootNavigator';
import {Formik} from 'formik';
import {Countdown, CustomPinCodeInput} from '../../../components';
import {CODE_LENGTH} from '../../../components/CustomPinCodeInput';

const Index = (props) => {
  const [showCountdown, setShowCountdown] = React.useState(false);

  useEffect(() => {
    setShowCountdown(true);
  }, []);

  //dispatch
  const dispatch = useDispatch();

  //Back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  const onVerifyOTP = async (formValues) => {
    console.log('onVerifyOTP ' + props.route.params.email);
    await dispatch(commonActions.toggleLoading(true));
    dispatch(
      userActions.userVerifyOTP({
        email: props.route.params.email,
        otp: formValues.code,
        onSuccess: () => onVerifyOTPSuccess(),
        onFail: () => onVerifyOTPFail(),
      }),
    );
  };

  const onVerifyOTPSuccess = async () => {
    await dispatch(commonActions.toggleLoading(false));
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
    setShowCountdown(true);
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('enterOTP')} onBack={() => onGoBack()}/>
          <Formik
            validateOnMount={true}
            initialValues={{code: ''}}
            onSubmit={(values) => onVerifyOTP(values)}>
            {({handleSubmit, handleChange, values, isValid}) => (
              <>
                <View style={styles.form}>
                  <Text style={styles.label}>{I18n.t('otpSent')}</Text>
                  <Text style={styles.phone}>{props.route.params.email}</Text>
                  <CustomPinCodeInput
                    name="code"
                    value={values.code}
                    onChange={handleChange('code')}
                  />
                  <ButtonRounded
                    label={I18n.t('next')}
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={!isValid || values.code.length !== CODE_LENGTH}
                  />
                </View>

                <View style={styles.btnWrapper}>
                  <TextButton
                    label={I18n.t('resendOTP')}
                    labelStyle={styles.labelTextButton}
                    onPress={() => onResendOTP()}
                    disabled={showCountdown}
                  />
                </View>

                <Countdown
                  showCountdown={showCountdown}
                  onCountDown={() => setShowCountdown(false)}
                />
              </>
            )}
          </Formik>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
