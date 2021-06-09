import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import brand1 from 'assets/images/brand1.png';

const BrandItem = ({index, item}) => {
  return (
    <View style={styles.itemContainer}>
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
    </View>
  );
};
export default BrandItem;
