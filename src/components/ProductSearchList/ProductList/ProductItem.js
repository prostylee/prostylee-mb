import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';
import picture from 'assets/images/signInBg.png';
import {Colors} from 'components';
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

const ProductItem = ({item, index}) => (
  <View style={styles.itemWrapper} key={`${item}-${index}`}>
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
        <ItemBadge />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
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
          <TouchableOpacity>
            <Heart />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
export default ProductItem;
