import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles';

const Container = ({
  children,
  style,
  hidden,
  onScroll,
  scrollEventThrottle,
  safeAreaTopStyle,
  safeAreaBottomStyle,
  barStyle,
  bgStatusBar,
  scrollViewRef,
  keyboardShouldPersistTaps,
}) => (
  <KeyboardAvoidingView style={styles.wrapper}>
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      keyboardShouldPersistTaps={
        keyboardShouldPersistTaps ? keyboardShouldPersistTaps : 'handled'
      }
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={scrollEventThrottle}
      bounces={false}
      ref={scrollViewRef}>
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
    </ScrollView>
  </KeyboardAvoidingView>
);

export default Container;
