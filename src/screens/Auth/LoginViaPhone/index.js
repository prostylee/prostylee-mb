import React from 'react';
import {View, Text} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputFloatingLabel,
  HeaderBack,
} from 'components';

import styles from './styles';

import I18n from 'i18n';

const Index = (props) => {
  //State
  const [phone, setPhone] = React.useState('');
  const [isFocusPhoneInput, setFocusPhoneInput] = React.useState(true);

  //back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //input
  const onChangePhone = (text) => {
    setPhone(text);
  };

  const onBlurPhoneInput = () => {
    setFocusPhoneInput(false);
  };

  const onFocusPhoneInput = () => {
    setFocusPhoneInput(true);
  };

  const onVerifyOTP = () => {};
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('loginWithPhone')}
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>
            <TextInputFloatingLabel
              placeholder={I18n.t('yourPhoneLabel')}
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              keyboardType="phone-pad"
              autoFocus={true}
              onBlur={() => onBlurPhoneInput()}
              onFocus={() => onFocusPhoneInput()}
              isFocused={isFocusPhoneInput}
            />
            <View style={styles.btnWrapper}>
              <ButtonRounded
                label={I18n.t('sendVerificationCode')}
                onPress={() => onVerifyOTP()}
                disabled={true}
              />
            </View>
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
