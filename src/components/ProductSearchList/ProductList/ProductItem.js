import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CURRENCY_VIET_NAM} from 'constants';

import {Image} from 'components';
import styles from './styles';
import picture from 'assets/images/signInBg.png';
import {Colors, ProductLike} from 'components';
import {currencyFormat} from 'utils/currency';
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
    key={`${item}-${index}`}
    onPress={() => {
      navigation.navigate('ProductDetail', {id: item.id});
    }}>
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
            item && item?.imageUrls?.length
              ? {uri: item?.imageUrls[0]}
              : picture
          }
          resizeMode="cover"
        />
        <ItemBadge />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item?.name}
        </Text>
        <View style={styles.itemPriceSale}>
          <Text style={styles.itemPrice}>
            {currencyFormat(
              item?.priceSale ? Number(item?.priceSale) : 0,
              CURRENCY_VIET_NAM,
            )}
          </Text>
        </View>
        <View style={styles.toolContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.itemDiscountPrice}>
              {currencyFormat(
                item?.price ? Number(item?.price) : 0,
                CURRENCY_VIET_NAM,
              )}
            </Text>
          </View>
          <ProductLike item={item} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
export default ProductItem;
