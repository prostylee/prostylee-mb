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
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {LogoWhite, Facebook, Google, Apple, Zalo} from 'svg/common';

import I18n from 'i18n';

//IMG
const IMG_BG = require('assets/images/loginBg.png');

//ICON
const IC_ZALO = require('assets/icons/zaloIcon.png');

import styles from './styles';

const Index = (props) => {
  //dispatch
  const dispatch = useDispatch();

  //UseEffect
  React.useEffect(() => {
    dispatch(commonActions.setInitialRouteName('Welcome'));
  }, []);

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
          <LogoWhite />
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
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtnWrapper}>
            <Google />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtnWrapper}>
            <Image
              source={IC_ZALO}
              resizeMode="contain"
              style={styles.socialBtn}
            />
            <Zalo />
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Apple />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Index;
