import React from 'react';
import {
  Platform,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {useBackHandler} from '@react-native-community/hooks';

import {Image, ButtonRounded} from 'components';

import I18n from 'i18n';

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
  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  const onLogin = () => {
    props.navigation.navigate('Login', {index: 0});
  };
  const onSignUp = () => {
    props.navigation.navigate('Login', {index: 1});
  };
  return (
    <ImageBackground source={IMG_BG} style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.mainWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={IMG_LOGO} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.btnWrapper}>
          <ButtonRounded onPress={() => onLogin()} label={I18n.t('login')} />
          <ButtonRounded
            onPress={() => onSignUp()}
            contentStyle={styles.signupBtn}
            labelStyle={styles.signupBtnLabel}
            style={styles.btnContainer}
            label={I18n.t('signUp')}
          />
        </View>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.labelDivider}>{I18n.t('otherLoginOptions')}</Text>
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
