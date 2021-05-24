import React from 'react';
import {View} from 'react-native';
import {ButtonRounded, Container, HeaderBack} from 'components';

import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';

import I18n from 'i18n';
import {Field, Formik} from 'formik';
import {CustomTextInput} from '../../../components';
import {validateEmail} from '../../../utils/validatorUtils';

const Index = (props) => {
  const dispatch = useDispatch();

  const onSubmitEmail = async (formValues) => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userForgotPassword({
        email: formValues.email,
        onSuccess: () => onUserForgotPasswordSuccess(formValues),
      }),
    );
  };

  const onUserForgotPasswordSuccess = async (formValues) => {
    await dispatch(commonActions.toggleLoading(false));
    props.navigation.navigate('ResetPassword', {email: formValues.email});
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
          <Formik
            validateOnMount={true}
            initialValues={{email: ''}}
            onSubmit={(values) => onSubmitEmail(values)}>
            {({handleSubmit, values, isValid}) => (
              <View style={styles.form}>
                <Field
                  component={CustomTextInput}
                  validate={validateEmail}
                  name="email"
                  label={I18n.t('email')}
                  keyboardType="email-address"
                />

                <View style={styles.btnWrapper}>
                  <ButtonRounded
                    label={I18n.t('next')}
                    onPress={handleSubmit}
                    disabled={!isValid || values.email === ''}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Container>
    </View>
  );
};

export default Index;
