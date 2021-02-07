import React from 'react';
import {View, Text} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputBorderBottom,
  HeaderBack,
} from 'components';

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

  const onVerifyOTP = () => {
    props.navigation.navigate('OTPVerification');
  };
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack title="Nhập mã xác minh" onBack={() => onGoBack()} />
          <View style={styles.form}>
            <Text style={styles.label}>
              Mã xác minh đã được vào số điện thoại
            </Text>
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
              label="Tiếp"
              style={styles.button}
              onPress={() => onVerifyOTP()}
              disabled={true}
            />
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
