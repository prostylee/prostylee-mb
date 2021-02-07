import React from 'react';
import {View, Text} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputBorderBottom,
  HeaderBack,
} from 'components';

import styles from './styles';

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
          <HeaderBack
            title="Đăng nhập bằng số điện thoại"
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>
            <Text style={styles.label}>Số điện thoại của bạn</Text>
            <TextInputBorderBottom
              hint=""
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              textInputStyle={styles.textInput}
              autoFocus={true}
              keyboardType="phone-pad"
            />
            <ButtonRounded
              label="Gửi mã xác minh"
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
