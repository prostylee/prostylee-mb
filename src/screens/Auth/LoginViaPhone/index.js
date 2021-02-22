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
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //input
  const onChangePhone = (text) => {
    setPhone(text);
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
              onChangeTextValue={(text) => onChangePhone(text)}
              textInputStyle={styles.textInput}
              autoFocus={true}
              keyboardType="phone-pad"
            />
            <ButtonRounded
              label={I18n.t('sendVerificationCode')}
              style={styles.button}
              onPress={() => onVerifyOTP()}
            />
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;