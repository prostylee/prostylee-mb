/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Bag, ChatIcon} from 'components';

const HeaderRight = ({color = '#fff', navigation, isAnimated = false}) => {
  return (
    <View style={styles.headerRightContainer}>
      <ChatIcon color={color} />
      <Bag
        color={color}
        width={20}
        height={20}
        strokeWidth={2}
        badgeColor={isAnimated ? '#E82E46' : '#fff'}
        badgeTextColor={isAnimated ? '#fff' : '#000'}
        navigation={navigation}
      />
    </View>
  );
};
export default HeaderRight;
