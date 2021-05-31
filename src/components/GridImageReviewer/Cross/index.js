import styles from './styles';

import React from 'react';
import {View} from 'react-native';

const Cross = () => {
  return (
    <View style={styles.background}>
      <View style={styles.left}>
        <View style={styles.right} />
      </View>
    </View>
  );
};

export default Cross;
