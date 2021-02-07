import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputBorderBottom,
  HeaderBack,
  Image,
  TextButton,
} from 'components';

import styles from './styles';

//ICONS
const IC_FACEBOOK = require('assets/icons/facebook.png');
const IC_GOOGLE = require('assets/icons/google.png');
const IC_ZALO = require('assets/icons/zalo.png');
const IC_APPLE = require('assets/icons/appleBlack.png');

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
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title="Đăng ký bằng số điện thoại"
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>
            {/* <Text style={styles.label}>Số điện thoại của bạn</Text> */}
            <TextInputBorderBottom
              hint="Họ tên"
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              style={styles.textInput}
              autoFocus={true}
            />
            <TextInputBorderBottom
              hint="Số điện thoại"
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              style={styles.textInput}
              autoFocus={true}
              keyboardType="phone-pad"
            />
            <ButtonRounded
              label="Đăng ký"
              style={styles.button}
              disabled={true}
            />
          </View>
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.labelDivider}>Hoặc đăng nhập bằng</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.socialLogin}>
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Image
                source={IC_FACEBOOK}
                resizeMode="contain"
                style={styles.socialBtn}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Image
                source={IC_GOOGLE}
                resizeMode="contain"
                style={[styles.socialBtn, styles.btnBordered]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Image
                source={IC_ZALO}
                resizeMode="contain"
                style={styles.socialBtn}
              />
            </TouchableOpacity>
            {Platform.OS === 'ios' && (
              <TouchableOpacity style={styles.socialBtnWrapper}>
                <Image
                  source={IC_APPLE}
                  resizeMode="contain"
                  style={styles.socialBtn}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.privacyWrapper}>
            <Text style={styles.noticeText}>
              Bằng việc đăng kí, bạn đã đồng ý với chúng tôi về
            </Text>
            <View style={styles.btnRowWrapper}>
              <TextButton
                onPress={() => onGoToTerms()}
                label="Điều khoản dịch vụ"
                labelStyle={styles.privacyButton}
              />
              <Text style={styles.noticeText}>và</Text>
              <TextButton
                onPress={() => onGoToPrivacy()}
                label="Chính sách bảo mật"
                labelStyle={styles.privacyButton}
              />
            </View>
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
