import React from 'react';
import {useNavigation} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PropTypes from 'prop-types';

import {StyleSheet, TouchableOpacity, View, Text, Platform} from 'react-native';

import {ChevronLeft, Remove} from 'svg/common';

const Header = ({
  title,
  titleStyle,
  containerStyle,
  leftIcon,
  leftPress,
  rightIcon,
  rightPress,
  middleComponent,
  rightComponent,
  leftComponent,
  leftStyle,
  isDefault,
  preventGobackFunction,
}) => {
  const navigation = useNavigation();

  const _goBack = () => {
    if (preventGobackFunction) {
      preventGobackFunction();
      return;
    }
    navigation.goBack();
    if (leftPress) {
      leftPress();
    }
  };
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {leftIcon || isDefault ? (
        <TouchableOpacity
          style={isDefault ? [styles.backStyle, leftStyle] : {}}
          onPress={isDefault ? _goBack : leftPress}>
          {!leftIcon ? <ChevronLeft /> : leftIcon}
        </TouchableOpacity>
      ) : leftComponent ? (
        leftComponent
      ) : null}
      {title ? (
        <Text
          style={titleStyle ? titleStyle : isDefault ? styles.titleStyle : {}}
          numberOfLines={1}>
          {title}
        </Text>
      ) : middleComponent ? (
        middleComponent
      ) : null}
      {rightIcon ? (
        <TouchableOpacity onPress={rightPress}>{rightIcon}</TouchableOpacity>
      ) : rightComponent ? (
        rightComponent
      ) : isDefault ? (
        <Text style={styles.emptyRightStyle} />
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '$white',
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
    paddingBottom: 10,
    height: 44 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
  },
  backStyle: {
    paddingLeft: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  titleStyle: {
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: '$font1',
    letterSpacing: -0.02,
  },
  emptyRightStyle: {
    width: 32,
  },
});

Header.propTypes = {
  title: PropTypes.string,
  leftPress: PropTypes.func,
  rightPress: PropTypes.func,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  middleComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  rightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  leftComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};
Header.defaultProps = {
  leftPress: () => {},
  rightPress: () => {},
  containerStyle: {},
  titleStyle: {},
  middleComponent: null,
  rightComponent: null,
  leftComponent: null,
  isDefault: false,
};

export default Header;
