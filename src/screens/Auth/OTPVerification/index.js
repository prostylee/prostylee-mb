import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ButtonRounded, ContainerWithoutScrollView, HeaderBack, TextButton} from 'components';

import I18n from 'i18n';
import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import {showMessage} from 'react-native-flash-message';

import styles from './styles';
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
    await dispatch(commonActions.toggleLoading(true));
    dispatch(
      userActions.userVerifyOTP({
        email: props.route.params.email,
        otp: formValues.code,
        onSuccess: () => onVerifyOTPSuccess(formValues),
        onFail: () => onVerifyOTPFail(),
      }),
    );
  };

  const onVerifyOTPSuccess = async (formValues) => {
    await dispatch(commonActions.toggleLoading(false));
    props.navigation.navigate('ResetPassword', {
      email: props.route.params.email,
      otp: formValues.code,
    });
  };

  const onVerifyOTPFail = async () => {
    await dispatch(commonActions.toggleLoading(false));
    showMessage({
      message: I18n.t('invalidOTP'),
      type: 'danger',
    });
  };
  const onResendOTP = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userForgotPassword({
        email: props.route.params.email,
        onSuccess: () => onResendOTPSuccess(),
      }),
    );
  };

  const onResendOTPSuccess = async () => {
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
                </View>

                <View style={styles.btnWrapper}>
                  <ButtonRounded
                    label={I18n.t('next')}
                    onPress={handleSubmit}
                    disabled={!isValid || values.code.length !== CODE_LENGTH}
                  />
                </View>

                <TextButton
                  label={I18n.t('resendOTP')}
                  labelStyle={styles.labelTextButton}
                  onPress={onResendOTP}
                  disabled={showCountdown}
                />

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
