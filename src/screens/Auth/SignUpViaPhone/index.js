import React from 'react';
import {Text, View} from 'react-native';
import {ButtonRounded, Container, HeaderBack, SocialSignIn, TextButton} from 'components';

import {useKeyboard} from '@react-native-community/hooks';

import I18n from 'i18n';

import styles from './styles';
import envConfig from 'config';
import {Field, Formik} from 'formik';
import {CustomTextInput} from '../../../components';
import {validateFullname, validatePhone} from '../../../utils/validatorUtils';

const Index = (props) => {
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //keyboard
  const keyboard = useKeyboard();

  const onSignUp = (values) => {
    console.log('onSignUp: ' + JSON.stringify(values));
  };

  //handle funcs
  const onGoToTerms = () => {
    props.navigation.navigate('PrivacyAndPolicy', {
      url: envConfig.termOfUseURL,
      title: I18n.t('termOfUse'),
    });
  };

  const onGoToPrivacy = () => {
    props.navigation.navigate('PrivacyAndPolicy', {
      url: envConfig.privacyPolicyURL,
      title: I18n.t('privacyPolicy'),
    });
  };

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('signUpWithPhone')}
            onBack={() => onGoBack()}
          />
          <Formik
            validateOnMount={true}
            initialValues={{fullname: '', phone: ''}}
            onSubmit={(values) => onSignUp(values)}>
            {({handleSubmit, values, isValid}) => (
              <View style={styles.form}>
                <Field
                  component={CustomTextInput}
                  validate={validateFullname}
                  name="fullname"
                  label={I18n.t('fullname')}
                />

                <Field
                  component={CustomTextInput}
                  validate={validatePhone}
                  name="phone"
                  label={I18n.t('yourPhoneLabel')}
                  keyboardType="phone-pad"
                />

                <View style={styles.btnWrapper}>
                  <ButtonRounded
                    label={I18n.t('signUp')}
                    onPress={handleSubmit}
                    disabled={
                      !isValid || values.fullname === '' || values.phone === ''
                    }
                  />
                </View>
              </View>
            )}
          </Formik>
          {!keyboard.keyboardShown && (
            <View>
              <SocialSignIn />

              <View style={styles.privacyWrapper}>
                <Text style={styles.noticeText}>
                  {I18n.t('signUpPolicyNoti')}
                </Text>
                <View style={styles.btnRowWrapper}>
                  <TextButton
                    onPress={() => onGoToTerms()}
                    label={I18n.t('termOfUse')}
                    labelStyle={styles.privacyButton}
                  />
                  <Text style={styles.noticeText}>{I18n.t('and')}</Text>
                  <TextButton
                    onPress={() => onGoToPrivacy()}
                    label={I18n.t('privacyPolicy')}
                    labelStyle={styles.privacyButton}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </Container>
    </View>
  );
};

export default Index;
