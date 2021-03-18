import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import styles from './styles';

import {Grid, Full} from 'svg/common';

const SwitchBottom = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touch}>
        <Grid />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touch}>
        <Full />
      </TouchableOpacity>
    </View>
  );
};

SwitchBottom.defaultProps = {};

SwitchBottom.propTypes = {};

export default SwitchBottom;
