import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Image, Rating, ProductLike} from 'components';
import {Heart} from 'svg/common';
import styles from './style';
import picture from 'assets/images/signInBg.png';
import {Colors} from 'components';
const ItemBadge = () => (
  <View
    style={[
      styles.itemBadge,
      {
        backgroundColor: Colors['$red'],
      },
    ]}>
    <Text style={styles.badgeText}>-50%</Text>
  </View>
);

const ProductItem = ({item, index, navigation}) => (
  <TouchableOpacity
    style={styles.itemWrapper}
    onPress={() => {
      navigation.navigate('ProductDetail', {id: 1});
    }}>
    <View
      style={[
        styles.itemInner,
        {
          paddingHorizontal: 15,
          paddingLeft: index % 2 !== 0 ? 0 : 15,
        },
      ]}>
      <View style={[styles.imageContainer]}>
        <Image style={styles.imageStyle} source={picture} resizeMode="cover" />
        <ItemBadge />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>Áo nỉ hoddie trơn đủ màu Unisex</Text>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.itemPrice}>99.000 đ</Text>
        </View>
        <View style={styles.toolContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.itemDiscountPrice}>99.000 đ</Text>
          </View>
          <ProductLike item={{id: 2}} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
export default ProductItem;
