import React from 'react';
import {StatusBar, ImageBackground} from 'react-native';

import {useSelector} from 'react-redux';
import {commonSelectors} from 'reducers';

import IMG_SPLASH from 'assets/images/splash.png';

import {LogoSplash} from 'svg/common';

import styles from './styles';

const Index = (props) => {
  const isShowOnboardingScreen = useSelector((state) =>
    commonSelectors.showOnboardingScreen(state),
  );

  //handle navigator
  React.useEffect(() => {
    if (!isShowOnboardingScreen) {
      setTimeout(() => {
        props.navigation.navigate('SignInOptions');
      }, 1000);
    } else {
      setTimeout(() => {
        props.navigation.navigate('Onboarding');
      }, 1000);
    }
  }, []);
  return (
    <ImageBackground source={IMG_SPLASH} style={styles.image}>
      <StatusBar translucent backgroundColor="transparent" />
      <LogoSplash />
    </ImageBackground>
  );
};

export default Index;
