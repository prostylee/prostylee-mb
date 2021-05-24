import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ButtonRounded, HeaderBack,} from 'components';

import I18n from 'i18n';

import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {ContainerWithoutScrollView, Countdown, CustomPinCodeInput, CustomSecureInput, TextButton,} from '../../../components';
import {Field, Formik} from 'formik';
import {validatePassword} from '../../../utils/validatorUtils';
import {CODE_LENGTH} from '../../../components/CustomPinCodeInput';

const Index = (props) => {
  const [showCountdown, setShowCountdown] = React.useState(false);
  const dispatch = useDispatch();

  const onGoBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    setShowCountdown(true);
  }, []);

  const onUpdateNewPassword = async (formValues) => {
    console.log('onUpdateNewPassword: ' + JSON.stringify(formValues));
    await dispatch(commonActions.toggleLoading(true));
    dispatch(
      userActions.userChangePassword({
        email: props.route.params.email,
        password: formValues.code,
        newPassword: formValues.password,
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
    setShowCountdown(true);
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('resetPw')} onBack={() => onGoBack()}/>

          <Formik
            validateOnMount={true}
            initialValues={{code: '', password: ''}}
            onSubmit={(values) => onUpdateNewPassword(values)}>
            {({handleSubmit, handleChange, values, isValid}) => (
              <>
                <View style={styles.form}>
                  <Text style={styles.label}>{I18n.t('otpSent')}</Text>
                  <Text style={styles.phone}>{props.route.params.email}</Text>

                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 12,
                    }}>
                    {I18n.t('enterOTP')}
                  </Text>

                  <CustomPinCodeInput
                    name="code"
                    value={values.code}
                    onChange={handleChange('code')}
                  />

                  <Field
                    component={CustomSecureInput}
                    validate={validatePassword}
                    name="password"
                    label={I18n.t('yourNewPw')}
                  />

                  <ButtonRounded
                    label={I18n.t('next')}
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={
                      !isValid ||
                      values.password === '' ||
                      values.code.length !== CODE_LENGTH
                    }
                  />
                </View>

                <View style={styles.btnWrapper}>
                  <TextButton
                    label={I18n.t('resendOTP')}
                    labelStyle={styles.labelTextButton}
                    onPress={() => onResendPassword()}
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
