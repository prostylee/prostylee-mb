import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {categoriesActions} from 'redux/reducers';
import {Colors} from 'components';
import styles from './styles';
import {Search, Menu} from 'svg/common';
import {useDispatch} from 'react-redux';

const HeaderLeft = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.headerLeftContainer}>
      <TouchableOpacity
        style={styles.headerLeftItem}
        onPress={() => {
          dispatch(
            categoriesActions.setCategoriesParentSelect({id: undefined}),
          );
          navigation.navigate('Categories');
        }}>
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
