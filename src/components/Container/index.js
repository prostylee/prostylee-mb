import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

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
  translucent,
  nestedScrollEnabled,
  overLapStatusBar = false,
  hasRefreshing = false,
  ...rest
}) => (
  <KeyboardAvoidingView style={styles.wrapper}>
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={scrollEventThrottle}
      bounces={hasRefreshing}
      nestedScrollEnabled={nestedScrollEnabled}
      ref={scrollViewRef}
      {...rest}>
      {overLapStatusBar ? (
        <View style={[styles.safeAreaTopStyle, safeAreaTopStyle]} />
      ) : (
        <SafeAreaView style={[styles.safeAreaTopStyle, safeAreaTopStyle]} />
      )}
      <StatusBar
        barStyle={barStyle}
        hidden={hidden}
        backgroundColor={bgStatusBar}
        translucent={translucent}
      />

      {children}
      <SafeAreaView style={[styles.safeAreaBottomStyle, safeAreaBottomStyle]} />
    </ScrollView>
  </KeyboardAvoidingView>
);

Container.defaultProps = {
  keyboardShouldPersistTaps: 'handled',
  barStyle: 'dark-content',
  translucent: true,
  hidden: false,
  bgStatusBar: '#fff',
  nestedScrollEnabled: false,
};

Container.propTypes = {
  keyboardShouldPersistTaps: PropTypes.string,
  translucent: PropTypes.bool,
  hidden: PropTypes.bool,
  barStyle: PropTypes.string,
  bgStatusBar: PropTypes.string,
  onScroll: PropTypes.func,
  nestedScrollEnabled: PropTypes.bool,
};

export default Container;
