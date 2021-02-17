import React from 'react';
import {StyleSheet, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const ThemeView = ({colorSecondary, isFullView, style, ...restProps}) => {
  return (
    <View
      {...restProps}
      style={StyleSheet.flatten([
        isFullView && styles.container,
        style && style,
      ])}
    />
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
});

export default ThemeView;
