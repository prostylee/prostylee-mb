import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MessageOutlined, BellWithNotiBadge, Bell} from 'svg/common';
import {Colors} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const GroupHeaderRightButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerGroupButtonRight}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Maps')}>
        <Icon name="md-map-outline" size={25} color="grey" />
      </TouchableOpacity>
    </View>
  );
};
export default GroupHeaderRightButton;
