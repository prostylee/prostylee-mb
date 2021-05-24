import React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';

import styles from './styles';

const RnRadioSelect = ({
  onPress,
  label,
  value,
  disabled,
  style,
  labelTextStyle,
  containerStyle,
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    disabled={disabled ? disabled : false}>
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.circle, style]}>
        {value === true ? <View style={styles.dot} /> : null}
      </View>
      <View style={styles.wrapperText}>
        <Text style={[styles.text, labelTextStyle]}>{label}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default RnRadioSelect;
