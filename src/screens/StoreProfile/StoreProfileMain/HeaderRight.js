import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {MessageOutlined, ChevronLeft, Bell} from 'svg/common';
import styles from './styles';
import {Header, HeaderAnimated, SearchBar, Colors, Bag} from 'components';
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
      <TouchableOpacity>
        <MessageOutlined
          color={Colors?.['$icon']}
          width={18}
          height={18}
          strokeWidth={2}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Bell
          color={Colors?.['$icon']}
          width={20}
          height={20}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={[
        styles.headerRightContainer,
        {
          width: 80,
        },
      ]}>
      <TouchableOpacity>
        <MessageOutlined color="#fff" width={18} height={18} strokeWidth={2} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Bag color="#fff" width={20} height={20} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderRight;
