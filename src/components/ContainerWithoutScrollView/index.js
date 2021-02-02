import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
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
}) => (
  <KeyboardAvoidingView style={styles.wrapper}>
    <View style={[styles.container, style]}>
      <SafeAreaView style={[styles.safeAreaTopStyle, safeAreaTopStyle]} />
      {Platform.OS === 'ios' && (
        <StatusBar
          barStyle={barStyle || 'dark-content'}
          hidden={hidden || false}
          backgroundColor={bgStatusBar || '#fff'}
        />
      )}
      {children}
      <SafeAreaView style={[styles.safeAreaBottomStyle, safeAreaBottomStyle]} />
    </View>
  </KeyboardAvoidingView>
);

export default ContainerWithoutScrollView;
