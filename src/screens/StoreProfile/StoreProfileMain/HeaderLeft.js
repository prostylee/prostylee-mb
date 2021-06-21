import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {MessageOutlined, ChevronLeft, Bell} from 'svg/common';
import styles from './styles';
import {Header, HeaderAnimated, SearchBar, Colors, Bag} from 'components';
const HeaderLeft = ({opacity, isAnimated = false, navigation}) => {
  return isAnimated ? (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          paddingLeft: 16,
          zIndex: 99999,
        },
      ]}
      onPress={() => navigation.goBack()}>
      <ChevronLeft color={Colors?.['$icon']} strokeWidth={2} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          paddingTop: 3,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={() => {
        console.log('GO BACK');
        navigation.goBack();
      }}>
      <ChevronLeft color="#fff" strokeWidth={2} />
    </TouchableOpacity>
  );
};
export default HeaderLeft;
