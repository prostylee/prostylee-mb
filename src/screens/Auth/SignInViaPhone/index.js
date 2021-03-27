import React from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  ButtonRounded,
  TextInputFloatingLabel,
  HeaderBack,
} from 'components';

import {useKeyboard} from '@react-native-community/hooks';

import styles from './styles';

import I18n from 'i18n';

const Index = (props) => {
  //State
  const [phone, setPhone] = React.useState('');
  const [invalidPhone, setInvalidPhone] = React.useState(false);
  const [errPhoneMsg, setErrPhoneMsg] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  //Ref
  const inputRef = React.useRef(null);

  //keyboard
  const keyboard = useKeyboard();

  //useEffect
  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
  }, []);

  //back
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //input
  const onChangePhone = (text) => {
    setPhone(text);
  };

  //Focus Input
  const onFocusInput = () => {
    setIsFocused(true);
  };
  //Blur Input
  const onBlurInput = () => {
    setIsFocused(false);
  };

  const onVerifyOTP = () => {};
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
              placeholder={I18n.t('yourPhoneLabel')}
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              keyboardType="phone-pad"
              autoFocus={true}
              isFocused={isFocused}
              onFocus={onFocusInput}
              onBlur={onBlurInput}
            />
            {!keyboard.keyboardShown && invalidPhone && (
              <Text style={styles.errMsg}>{errPhoneMsg}</Text>
            )}
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
