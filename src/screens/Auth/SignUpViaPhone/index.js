import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  ButtonRounded,
  TextInputFloatingLabel,
  HeaderBack,
  TextButton,
  SocialSignIn,
} from 'components';

import {useKeyboard} from '@react-native-community/hooks';

import I18n from 'i18n';

import styles from './styles';
import envConfig from 'config';
import _ from 'lodash';
import {fullNameRegex} from '../../../utils/common';

const Index = (props) => {

  const [fullname, setFullname] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [disabledSignUpBtn, setDisabledSignUpBtn] = useState(true);

  const onGoBack = () => {
    props.navigation.goBack();
  };

  //keyboard
  const keyboard = useKeyboard();

  //input
  const onChangeFullname = (value) => {
    if (_.isEmpty(value)) {
      setFullname({
        value: '',
        error: I18n.t('validation.required', {field: I18n.t('user.name')}),
      });
      setDisabledSignUpBtn(true);
    } else if (fullNameRegex.test(value) === false) {
      setFullname({
        value: value,
        error: I18n.t('validation.invalid', {field: I18n.t('user.name')}),
      });
      setDisabledSignUpBtn(true);
    } else {
      setFullname({value: value, error: ''});
      setDisabledSignUpBtn(false);
    }
  };
  const onChangePhone = (value) => {
    setPhone({value: value, error: ''}); // TODO validate phone number
    setDisabledSignUpBtn(false);
  };

  const onSignUp = () => {};

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
          <View style={styles.form}>
            <TextInputFloatingLabel
              label={I18n.t('fullname')}
              value={fullname.value}
              onChangeText={onChangeFullname}
              error={!!fullname.error}
              errorText={fullname.error}
            />

            <TextInputFloatingLabel
              label={I18n.t('yourPhoneLabel')}
              value={phone.value}
              onChangeText={(text) => onChangePhone(text)}
              keyboardType="phone-pad"
              error={!!phone.error}
              errorText={phone.error}
            />

            <View style={styles.btnWrapper}>
              <ButtonRounded
                label={I18n.t('signUp')}
                disabled={disabledSignUpBtn}
                onPress={() => onSignUp()}
              />
            </View>
          </View>
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
