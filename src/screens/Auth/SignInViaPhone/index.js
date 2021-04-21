import React from 'react';
import {View} from 'react-native';
import {ButtonRounded, Container, HeaderBack} from 'components';

import styles from './styles';

import I18n from 'i18n';
import {Field, Formik} from 'formik';
import {CustomTextInput} from '../../../components';
import {validateEmail} from '../../../utils/validatorUtils';

const Index = (props) => {
  //back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  const onVerifyOTP = (values) => {
    console.log('onVerifyOTP ' + JSON.stringify(values));
  };

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('signInWithPhone')}
            onBack={() => onGoBack()}
          />
          <Formik
            validateOnMount={true}
            initialValues={{phone: ''}}
            onSubmit={(values) => onVerifyOTP(values)}>
            {({handleSubmit, values, isValid}) => (
              <View style={styles.form}>
                <Field
                  component={CustomTextInput}
                  validate={validateEmail}
                  name="phone"
                  label={I18n.t('yourPhoneLabel')}
                  keyboardType="phone-pad"
                />

                <View style={styles.btnWrapper}>
                  <ButtonRounded
                    label={I18n.t('sendVerificationCode')}
                    onPress={handleSubmit}
                    disabled={!isValid || values.phone === ''}
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
