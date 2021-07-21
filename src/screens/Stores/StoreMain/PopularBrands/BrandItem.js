import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import brand1 from 'assets/images/default.png';
import {brandActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const BrandItem = ({index, item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const _handlePress = () => {
    dispatch(brandActions.setSelectedBrand(item));
    navigation.navigate('Brand');
  };
  return (
    <TouchableOpacity onPress={_handlePress} style={styles.itemContainer}>
      <View style={styles.brandImgContainer}>
        <Image
          source={item.icon ? {uri: item.icon} : brand1}
          style={styles.brandImg}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.brandName}>
        {item?.name ? item?.name : 'No brand'}
      </Text>
    </TouchableOpacity>
  );
};
export default BrandItem;
