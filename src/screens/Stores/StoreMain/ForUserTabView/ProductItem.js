import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Image, Rating, ProductLike} from 'components';
import {Heart} from 'svg/common';
import styles from './style';
import picture from 'assets/images/signInBg.png';
import {Colors} from 'components';
import {currencyFormat, priceSalePercent} from 'utils/currency';
const ItemBadge = ({value = 0}) => (
  <View
    style={[
      styles.itemBadge,
      {
        backgroundColor: Colors['$red'],
      },
    ]}>
    <Text style={styles.badgeText}>-{value}%</Text>
  </View>
);

const ProductItem = ({item, index, navigation}) => (
  <TouchableOpacity
    style={styles.itemWrapper}
    onPress={() => {
      navigation.navigate('ProductDetail', {id: item.id});
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
        <Image
          style={styles.imageStyle}
          source={
            item && item?.imageUrls?.length
              ? {uri: item?.imageUrls[0]}
              : picture
          }
          resizeMode="cover"
        />
        <ItemBadge value={priceSalePercent(item?.price, item?.priceSale)} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item?.name}
        </Text>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.itemPrice}>
            {currencyFormat(item?.priceSale ? Number(item?.priceSale) : 0, 'đ')}
          </Text>
        </View>
        <View style={styles.toolContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.itemDiscountPrice}>
              {currencyFormat(item?.priceSale ? Number(item?.price) : 0, 'đ')}
            </Text>
          </View>
          <ProductLike item={item} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
export default ProductItem;
