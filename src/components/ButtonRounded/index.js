/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';

import Image from '../Image';

const ButtonRounded = ({
  title,
  onPress,
  style,
  hide,
  disabled,
  iconLeft,
  iconRight,
  tintColor,
  titleStyle,
  iconStyle,
}) =>
  hide ? null : (
    <TouchableWithoutFeedback
      disabled={disabled ? disabled : false}
      onPress={onPress}>
      <View
        style={[
          styles.button,
          {backgroundColor: disabled ? '#ccc' : 'transparent'},
          style,
        ]}>
        {iconLeft ? (
          <Image
            source={iconLeft}
            resizeMethod="resize"
            style={[styles.iconLeft, iconStyle]}
            tintColor={tintColor}
          />
        ) : null}
        <Text style={[styles.text, titleStyle]}>{title}</Text>
        {iconRight ? (
          <Image
            source={iconRight}
            resizeMethod="resize"
            style={[styles.iconRight, iconStyle]}
            tintColor={tintColor}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );

export default ButtonRounded;
