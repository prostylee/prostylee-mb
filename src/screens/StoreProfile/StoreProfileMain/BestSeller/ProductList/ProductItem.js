import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {CURRENCY_VIET_NAM} from 'constants';

import {Image} from 'components';
import styles from './styles';
import picture from 'assets/images/signInBg.png';
import {Colors, ProductLike} from 'components';
import {currencyFormat, priceSalePercent} from 'utils/currency';
import {useNavigation} from '@react-navigation/native';
const ItemBadge = ({value}) => (
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

const ProductItem = ({item, index}) => {
  const navigation = useNavigation();
  const clickItem = () => {
    navigation.navigate('ProductDetail', {id: item.id});
  };
  return (
    <TouchableOpacity
      style={styles.itemWrapper}
      key={`${item}-${index}`}
      onPress={clickItem}>
      <View style={styles.itemInner}>
        <View style={[styles.imageContainer]}>
          <Image
            style={styles.imageStyle}
            source={
              item.imageUrls && item.imageUrls.length
                ? {uri: item.imageUrls[0]}
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
          <View style={styles.toolContainer}>
            <Text style={styles.itemPrice} numberOfLines={1}>
              {currencyFormat(item?.priceSale || 0, CURRENCY_VIET_NAM)}
            </Text>

            <ProductLike item={item} />
          </View>
          <View style={styles.directionColumn}>
            <Text style={styles.itemDiscountPrice}>
              {currencyFormat(item?.price || 0, CURRENCY_VIET_NAM)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;
