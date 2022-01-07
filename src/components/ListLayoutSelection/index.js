import styles from './styles';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Grid, GridTight} from 'svg/common';

const ListLayoutSelection = ({
  style,
  itemStyle,
  value,
  leftAction,
  rightAction,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <TouchableOpacity
        onPress={leftAction}
        style={StyleSheet.flatten([styles.itemLeftStyle, itemStyle])}>
        <GridTight
          color={value == 'grid' ? '#333333' : '#8B9399'}
          fill={value == 'grid' ? '#333333' : 'none'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={rightAction}
        style={StyleSheet.flatten([styles.itemRightStyle, itemStyle])}>
        <Grid
          color={value == 'full' ? '#333333' : '#8B9399'}
          fill={value == 'full' ? '#333333' : 'none'}
        />
      </TouchableOpacity>
    </View>
  );
};

ListLayoutSelection.defaultProps = {
  style: {},
  itemStyle: {},
  value: 'full',
  leftAction: () => {},
  rightAction: () => {},
};

export default ListLayoutSelection;
