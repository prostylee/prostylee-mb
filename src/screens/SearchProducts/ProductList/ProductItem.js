import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Image, ProductLike, ProductRatingStar} from 'components';
import {CURRENCY_VIET_NAM} from 'constants';

import styles from './styles';

import {Colors} from 'components';
import {currencyFormat, priceSalePercent} from 'utils/currency';

const ItemBadge = ({discountPercent = 0}) => (
  <View
    style={[
      styles.itemBadge,
      {
        backgroundColor: Colors['$red'],
      },
    ]}>
    <Text style={styles.badgeText}>-{discountPercent}%</Text>
  </View>
);

const ProductItem = ({item, index, navigation}) => {
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
            source={{uri: item?.imageUrls?.[0]}}
            resizeMode="cover"
          />
          <ItemBadge
            discountPercent={priceSalePercent(
              item?.price ? item?.price : 0,
              item?.priceSale ? item?.priceSale : 0,
            )}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <View style={styles.directionColumn}>
            <Text style={styles.itemDiscountPrice}>
              {currencyFormat(
                item?.priceSale ? item?.priceSale : 0,
                CURRENCY_VIET_NAM,
              )}
            </Text>
            <Text style={styles.itemPrice}>
              {currencyFormat(item?.price ? item?.price : 0, CURRENCY_VIET_NAM)}
            </Text>
          </View>
          <View style={styles.toolContainer}>
            <View style={styles.ratingContainer}>
              <ProductRatingStar
                value={item?.productStatisticResponse?.resultOfRating || 0}
              />
              <Text style={styles.ratingPoint}>
                {item.productStatisticResponse
                  ? `${item?.productStatisticResponse?.resultOfRating}(${item?.productStatisticResponse?.numberOfLike})`
                  : '0(0)'}
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
