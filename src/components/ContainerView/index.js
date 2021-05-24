import React from 'react';
import {StyleSheet, View} from 'react-native';

const Container = ({fluid, style, children, ...rest}) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        fluid && styles.fluid,
        style,
      ])}
      {...rest}>
      {children}
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 16,
  },
  fluid: {
    paddingHorizontal: 0,
  },
};

export default Container;
