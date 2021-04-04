import React, {useState} from 'react';
import {View} from 'react-native';
import {
  ButtonRounded,
  Container,
  HeaderBack,
  TextInputFloatingLabel,
} from 'components';

import styles from './styles';

import I18n from 'i18n';

const Index = (props) => {
  const [phone, setPhone] = useState({value: '', error: ''});

  //back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  const onChangePhone = (value) => {
    setPhone({value: value, error: ''}); // TODO validate phone number
  };

  const onVerifyOTP = () => {
  };

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('signInWithPhone')}
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>
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
                label={I18n.t('sendVerificationCode')}
                onPress={() => onVerifyOTP()}
                disabled={true}
              />
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Index;
