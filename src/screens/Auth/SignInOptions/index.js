import React from 'react';
import {BackHandler, ImageBackground, StatusBar, ToastAndroid, View,} from 'react-native';

import {useBackHandler} from '@react-native-community/hooks';

import {ButtonRounded, SocialSignIn} from '../../../components';
import {useDispatch} from 'react-redux';
import {LogoWhite} from '../../../svg/common';

import I18n from 'i18n';
import styles from './styles';
import RootNavigator from '../../../navigator/rootNavigator';
import {commonActions} from '../../../redux/reducers';

//IMG
const IMG_BG = require('assets/images/signInBg.png');

const Index = (props) => {
  //dispatch
  const dispatch = useDispatch();

  //UseEffect
  React.useEffect(() => {
    dispatch(commonActions.setInitialRouteName('Welcome'));
  }, []);

  //BackHandler handle
  let currentCount = 0;
  useBackHandler(() => {
    if (currentCount < 1) {
      currentCount += 1;
      ToastAndroid.showWithGravity(
        I18n.t('pressBackToExitApp'),
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      // exit the app here using
      BackHandler.exitApp();
    }
    setTimeout(() => {
      currentCount = 0;
    }, 4000);
    return true;
  });

  const onSignIn = () => {
    RootNavigator.navigate('SignIn', {index: 0});
  };
  const onSignUp = () => {
    RootNavigator.navigate('SignIn', {index: 1});
  };
  return (
    <ImageBackground source={IMG_BG} style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.mainWrapper}>
        <View style={styles.logoWrapper}>
          <LogoWhite />
        </View>
        <View style={styles.btnWrapper}>
          <ButtonRounded onPress={onSignIn} label={I18n.t('signIn')} />
          <ButtonRounded
            onPress={onSignUp}
            contentStyle={styles.signupBtn}
            labelStyle={styles.signupBtnLabel}
            style={styles.btnContainer}
            label={I18n.t('signUp')}
          />
        </View>
        <SocialSignIn useWhiteAppleIcon={true} />
      </View>
    </ImageBackground>
  );
};

export default Index;
