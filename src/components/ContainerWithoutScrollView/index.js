import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import styles from './styles';

const ContainerWithoutScrollView = ({
  children,
  style,
  hidden,
  safeAreaTopStyle,
  safeAreaBottomStyle,
  barStyle,
  bgStatusBar,
  translucent,
}) => (
  <KeyboardAvoidingView style={styles.wrapper}>
    <View style={[styles.container, style]}>
      <SafeAreaView style={[styles.safeAreaTopStyle, safeAreaTopStyle]} />

      <StatusBar
        barStyle={barStyle}
        hidden={hidden}
        backgroundColor={bgStatusBar}
        translucent={translucent}
      />

      {children}
      <SafeAreaView style={[styles.safeAreaBottomStyle, safeAreaBottomStyle]} />
    </View>
  </KeyboardAvoidingView>
);

ContainerWithoutScrollView.defaultProps = {
  barStyle: 'dark-content',
  translucent: true,
  hidden: false,
  bgStatusBar: '#fff',
};

export default ContainerWithoutScrollView;
