import styles from './styles';

import React from 'react';
import {View} from 'react-native';

const MoveLeft = () => {
  return (
    <View style={styles.background}>
      <View style={styles.top}>
        <View style={styles.bottom} />
      </View>
    </View>
  );
};

export default MoveLeft;
