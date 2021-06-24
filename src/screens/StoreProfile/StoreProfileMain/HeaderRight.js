import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import styles from './styles';
import {Colors, ChatIcon, Bag, NotificationIcon} from 'components';
const HeaderRight = ({opacity, isAnimated = false}) => {
  return isAnimated ? (
    <View
      style={[
        styles.headerRightContainer,
        {
          width: 80,
          paddingRight: 19,
        },
      ]}>
      <ChatIcon />
      <NotificationIcon
        color={Colors?.['$icon']}
        width={20}
        height={20}
        strokeWidth={2}
      />
    </View>
  ) : (
    <View
      style={[
        styles.headerRightContainer,
        {
          width: 80,
        },
      ]}>
      <ChatIcon color="#fff" />

      <TouchableOpacity>
        <Bag color="#fff" width={24} height={24} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderRight;
