import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MessageOutlined, BellWithNotiBadge, Bell} from 'svg/common';
import {Colors, ChatIcon, NotificationIcon} from 'components';

import styles from './styles';

const GroupHeaderRightButton = ({haveNoti = false}) => {
  return (
    <View style={styles.headerGroupButtonRight}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ChatIcon strokeWidth={2} />
      </TouchableOpacity>
      <NotificationIcon strokeWidth={2} />
    </View>
  );
};
export default GroupHeaderRightButton;
