import React from 'react';
import {View, Text} from 'react-native';
import {ContainerWithoutScrollView, ButtonOutlined, Image} from 'components';

import I18n from 'i18n';

import styles from './styles';

const IC_SUCCESS = require('assets/icons/success.png');

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

  const onVerifyOTP = () => {
    props.navigation.navigate('OTPVerification');
  };
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <Image source={IC_SUCCESS} style={styles.icon} resizeMode="contain" />
          <Text style={styles.label}>{I18n.t('emailSent')}</Text>
          <Text style={styles.content}>
            {I18n.t('emailSentNoti1')}
            <Text style={styles.email}>phap22011994@gmail.com</Text>{'. '}
            {I18n.t('emailSentNoti2')}
          </Text>
          <ButtonOutlined
            label={I18n.t('backToLogin')}
            contentStyle={styles.contentButton}
            style={styles.button}
            onPress={() => onVerifyOTP()}
          />
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
