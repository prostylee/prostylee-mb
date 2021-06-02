import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';
import picture from '../../../assets/images/signInBg.png';
import {Colors} from 'components';
import {formatMoney} from '../../../utils/numberUtils';
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

const ProductItem = ({item, index}) => (
  <View style={styles.itemWrapper}>
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
        <Text style={styles.itemName}>Áo nỉ hoddie trơn đủ màu Unisex</Text>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.itemDiscountPrice}>
            {currencyFormat(item?.priceSale ? item?.priceSale : 0, 'đ')}
          </Text>
          <Text style={styles.itemPrice}>
            {currencyFormat(item?.price ? item?.price : 0, 'đ')}
          </Text>
        </View>
        <View style={styles.toolContainer}>
          <View style={styles.ratingContainer}>
            <Rating
              imageSize={10}
              showRating={false}
              startingValue={item?.productStatisticResponse?.resultOfRating}
            />
            <Text style={styles.ratingPoint}>
              {item.productStatisticResponse
                ? `${item?.productStatisticResponse?.resultOfRating}(
                  ${item?.productStatisticResponse?.numberOfLike})`
                : '0(0)'}
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