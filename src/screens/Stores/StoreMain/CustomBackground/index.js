import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {TopMaskBackground} from 'svg/common';
const CustomBackground = () => {
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', bottom: -10}}>
        <TopMaskBackground />
      </View>
    </View>
  );
};
export default CustomBackground;
