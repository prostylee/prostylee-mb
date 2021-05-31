import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import brand1 from 'assets/images/brand1.png';
import brand2 from 'assets/images/brand2.png';
import brand3 from 'assets/images/brand3.png';
import brand4 from 'assets/images/brand4.png';
import brand5 from 'assets/images/brand5.png';

const BrandItem = ({index}) => (
  <View style={styles.itemContainer}>
    <View style={styles.brandImgContainer}>
      <Image
        source={
          index === 0
            ? brand1
            : index === 1
            ? brand2
            : index === 2
            ? brand3
            : index === 3
            ? brand4
            : index === 4
            ? brand5
            : brand1
        }
        style={styles.brandImg}
        resizeMode="cover"
      />
    </View>
    <Text style={styles.brandName}>
      {index === 0
        ? 'Zara'
        : index === 1
        ? 'Nike'
        : index === 2
        ? `Levi's`
        : index === 3
        ? 'Fendi'
        : index === 4
        ? `H & M`
        : 'Zara'}
    </Text>
  </View>
);
export default BrandItem;
