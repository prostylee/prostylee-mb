import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import nike from '../../../assets/images/nike.png';

const BrandItem = () => (
  <View style={styles.itemContainer}>
    <View style={styles.brandImgContainer}>
      <Image source={nike} style={styles.brandImg} resizeMode="cover" />
    </View>
    <Text style={styles.brandName}>Nike</Text>
  </View>
);
export default BrandItem;
