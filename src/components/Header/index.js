import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet';

import PropTypes from 'prop-types'

import { StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native'

const Header = ({ 
  title, 
  titleStyle, 
  containerStyle, 
  leftIcon, 
  leftPress, 
  rightIcon, 
  middleComponent,
  rightComponent,
  leftComponent,
 }) => {

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {leftIcon ?
        <TouchableOpacity onPress={leftPress}>
          {leftIcon}
        </TouchableOpacity>
        : (leftComponent ? leftComponent : null)
      }
      {title ?
        <Text style={titleStyle}>
          {title}
        </Text>
        : (middleComponent ? middleComponent : null)
      }
      {rightIcon ?
        <TouchableOpacity onPress={rightPress}>
          {rightIcon}
        </TouchableOpacity>
        : (rightComponent ? rightComponent : null)
      }
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
    paddingBottom: 12,
    height: 86 + (Platform.OS === 'ios' ? 0 : 0),
  }
});

Header.propTypes = {
  title: PropTypes.string,
  leftPress: PropTypes.func,
  rightPress: PropTypes.func,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  titleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  middleComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  rightComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  leftComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
}
Header.defaultProps = {
  leftPress: () => { },
  rightPress: () => { },
  containerStyle: {},
  titleStyle: {},
  middleComponent: null,
  rightComponent: null,
  leftComponent: null,
};

export default Header;
