import React from 'react';
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

const Index = (props) => {
  //State
  const [fullname, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isFocusFullNameInput, setFocusFullNameInput] = React.useState(true);
  const [isFocusPhoneInput, setFocusPhoneInput] = React.useState(false);
  //Back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //keyboard
  const keyboard = useKeyboard();

  //input
  const onChangeFullname = (text) => {
    setFullName(text);
  };
  const onChangePhone = (text) => {
    setPhone(text);
  };

  const onBlurFullNameInput = () => {
    setFocusFullNameInput(false);
  };

  const onFocusFullNameInput = () => {
    setFocusFullNameInput(true);
  };

  const onBlurPhoneInput = () => {
    setFocusPhoneInput(false);
  };

  const onFocusPhoneInput = () => {
    setFocusPhoneInput(true);
  };

  //submit
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
              placeholder={I18n.t('fullname')}
              value={fullname}
              onChangeText={(text) => onChangeFullname(text)}
              autoFocus={true}
              onBlur={() => onBlurFullNameInput()}
              onFocus={() => onFocusFullNameInput()}
              isFocused={isFocusFullNameInput}
            />
            <TextInputFloatingLabel
              placeholder={I18n.t('yourPhone')}
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              keyboardType="phone-pad"
              onBlur={() => onBlurPhoneInput()}
              onFocus={() => onFocusPhoneInput()}
              isFocused={isFocusPhoneInput}
            />
            <View style={styles.btnWrapper}>
              <ButtonRounded
                label={I18n.t('signUp')}
                disabled={true}
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
