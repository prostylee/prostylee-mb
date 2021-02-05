import React from 'react';
import {
  Platform,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {Image} from 'components';

import {Button} from 'react-native-paper';

//IMG
const IMG_BG = require('assets/images/loginBg.png');
const IMG_LOGO = require('assets/images/logoWhite.png');

//ICON
const IC_FACEBOOK = require('assets/icons/facebook.png');
const IC_GOOGLE = require('assets/icons/google.png');
const IC_ZALO = require('assets/icons/zalo.png');
const IC_APPLE = require('assets/icons/appleWhite.png');

import styles from './styles';

const Index = (props) => {
  const onLogin = () => {
    props.navigation.navigate('Login', {index: 0});
  };
  const onSignUp = () => {
    props.navigation.navigate('Login', {index: 1});
  };
  return (
    <ImageBackground source={IMG_BG} style={styles.background}>
      <View style={styles.mainWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={IMG_LOGO} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => onLogin()}
            style={styles.loginBtn}
            labelStyle={styles.loginBtnLabel}>
            Đăng nhập
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => onSignUp()}
            style={styles.signupBtn}
            labelStyle={styles.signupBtnLabel}>
            Đăng ký
          </Button>
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
              style={styles.socialBtn}
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
      </View>
    </ImageBackground>
  );
};

export default Index;
