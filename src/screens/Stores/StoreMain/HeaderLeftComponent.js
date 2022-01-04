import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'components';
import styles from './styles';
import {Search, Menu} from 'svg/common';

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerLeftContainer}>
      <TouchableOpacity style={styles.headerLeftItem}>
        <Menu color={Colors['$black']} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerLeftItem}
        onPress={() => navigation.navigate('Search')}>
        <Search color={Colors['$black']} />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderLeft;
