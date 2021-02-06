import React from 'react';
import {View} from 'react-native';
import {Image} from 'components';

const IMG_SPLASH = require('assets/images/splash.png');

import styles from './styles';

const Index = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Onboarding');
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={IMG_SPLASH} resizeMode="cover" style={styles.image} />
    </View>
  );
};

export default Index;
