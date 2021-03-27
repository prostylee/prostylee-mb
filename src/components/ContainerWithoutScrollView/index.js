import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';

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

ContainerWithoutScrollView.propTypes = {
  translucent: PropTypes.bool,
  hidden: PropTypes.bool,
  barStyle: PropTypes.string,
  bgStatusBar: PropTypes.string,
};

export default ContainerWithoutScrollView;
