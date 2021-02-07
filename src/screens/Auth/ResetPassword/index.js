import React from 'react';
import {View} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputBorderBottom,
  HeaderBack,
} from 'components';

import I18n from 'i18n';

import styles from './styles';

//ICONS
const IC_EYE = require('assets/icons/eye.png');

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
          <HeaderBack title={I18n.t('resetPw')} onBack={() => onGoBack()} />
          <View style={styles.form}>
            <TextInputBorderBottom
              hint={I18n.t('yourNewPw')}
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              textInputStyle={styles.textInput}
              autoFocus={true}
              icon={IC_EYE}
              secureTextEntry={true}
            />
            <ButtonRounded
              label={I18n.t('nextVn')}
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
