import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Bag, ChatIcon} from 'components';

const HeaderRight = ({color = '#fff', navigation}) => {
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity style={styles.headerRightItem}>
        <ChatIcon color={color} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerRightItem}>
        <Bag
          color={color}
          width={20}
          height={20}
          strokeWidth={2}
          badgeColor={'#E82E46'}
          badgeTextColor={'#fff'}
          navigation={navigation}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderRight;
