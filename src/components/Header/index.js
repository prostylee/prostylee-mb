import React from 'react';
import {useNavigation} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';

import PropTypes from 'prop-types';

import {StyleSheet, TouchableOpacity, View, Text, Platform} from 'react-native';

import {ChevronLeft} from 'svg/common';

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
  isDefault,
}) => {
  const navigation = useNavigation();

  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {leftIcon || isDefault ? (
        <TouchableOpacity
          style={isDefault ? styles.backStyle : {}}
          onPress={isDefault ? _goBack : leftPress}>
          {isDefault ? <ChevronLeft /> : leftIcon}
        </TouchableOpacity>
      ) : leftComponent ? (
        leftComponent
      ) : null}
      {title ? (
        <Text style={isDefault ? styles.titleStyle : titleStyle}>{title}</Text>
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
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '$white',
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
    paddingBottom: '12rem',
    height: Platform.OS === 'android' ? '56rem' : '78rem',
  },
  backStyle: {
    paddingLeft: 16,
  },
  titleStyle: {
    fontWeight: '500',
    fontSize: 16,
    fontFamily: '$font1',
    letterSpacing: -0.02,
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
