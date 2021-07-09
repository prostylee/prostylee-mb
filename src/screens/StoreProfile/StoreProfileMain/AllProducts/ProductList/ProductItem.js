import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
    <TouchableOpacity style={styles.itemWrapper} onPress={clickItem}>
      <View
        style={[
          styles.itemInner,
          {
            paddingLeft: index % 2 !== 0 ? 6 : 15,
            paddingRight: index % 2 === 0 ? 6 : 15,
          },
        ]}>
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
          <ItemBadge
            value={priceSalePercent(item?.price || 0, item?.priceSale || 0)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item?.name}
          </Text>
          <View style={styles.directionColumn}>
            <Text style={styles.itemPrice}>
              {currencyFormat(item?.priceSale || 0, CURRENCY_VIET_NAM)}
            </Text>
          </View>
          <View style={styles.toolContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.itemDiscountPrice}>
                {currencyFormat(item?.price || 0, CURRENCY_VIET_NAM)}
              </Text>
            </View>
            <ProductLike item={item} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;
