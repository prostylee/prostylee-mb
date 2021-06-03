import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import brand1 from 'assets/images/brand1.png';
import brand2 from 'assets/images/brand2.png';
import brand3 from 'assets/images/brand3.png';
import brand4 from 'assets/images/brand4.png';
import brand5 from 'assets/images/brand5.png';

const BrandItem = ({index, item}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.brandImgContainer}>
        <Image
          source={{uri: item.icon}}
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
