import React from 'react';
import {View, Text} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextButton,
  HeaderBack,
} from 'components';

import I18n from 'i18n';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import styles from './styles';

const Index = (props) => {
  //State
  const [code, setCode] = React.useState('');
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //input
  const onChangeCode = (text) => {
    setCode(text);
  };

  const onResetPassword = () => {
    props.navigation.navigate('ResetPasswordViaMail');
  };
  const onResendOTP = () => {};
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title={I18n.t('enterOTP')} onBack={() => onGoBack()} />
          <View style={styles.form}>
            <Text style={styles.label}>{I18n.t('otpSent')}</Text>
            <Text style={styles.phone}>(+84) 12237283</Text>
            <SmoothPinCodeInput
              cellStyle={styles.cellStyle}
              cellStyleFocused={styles.cellStyleFocused}
              textStyle={styles.textStyle}
              textStyleFocused={styles.textStyleFocused}
              cellSpacing={15}
              codeLength={6}
              autoFocus={true}
              onFulfill={() => {}}
              value={code}
              onTextChange={(value) => onChangeCode(value)}
            />
            <ButtonRounded
              label={I18n.t('nextVn')}
              style={styles.button}
              onPress={() => onResetPassword()}
              disabled={false}
            />
          </View>
          <View style={styles.btnWrapper}>
            <TextButton
              label={I18n.t('resendOTP')}
              labelStyle={styles.labelTextButton}
              onPress={() => onResendOTP()}
            />
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
