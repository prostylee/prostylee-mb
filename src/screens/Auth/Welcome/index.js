import React from 'react';
import {View, StatusBar, ImageBackground} from 'react-native';

const IMG_SPLASH = require('assets/images/splash.png');

import styles from './styles';

const Index = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Onboarding');
    }, 1000);
  }, []);
  return (
    <ImageBackground source={IMG_SPLASH} style={styles.image}>
      <StatusBar translucent backgroundColor="transparent" />
    </ImageBackground>
  );
};

export default Index;
