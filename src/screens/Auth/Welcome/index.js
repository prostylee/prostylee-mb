import React from 'react';
import {StatusBar, ImageBackground} from 'react-native';

import {useSelector} from 'react-redux';
import {commonSelectors} from 'reducers';

const IMG_SPLASH = require('assets/images/splash.png');

import styles from './styles';

const Index = (props) => {
  const isShowOnboardingScreen = useSelector((state) =>
    commonSelectors.showOnboardingScreen(state),
  );

  //handle navigator
  React.useEffect(() => {
    if (!isShowOnboardingScreen) {
      setTimeout(() => {
        props.navigation.navigate('LoginOptions');
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
    </ImageBackground>
  );
};

export default Index;
