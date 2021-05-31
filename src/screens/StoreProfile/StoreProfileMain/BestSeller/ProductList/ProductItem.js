import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';
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

const ProductItem = ({item, index}) => (
  <View style={styles.itemWrapper} key={`${item}-${index}`}>
    <View style={styles.itemInner}>
      <View style={[styles.imageContainer]}>
        <Image style={styles.imageStyle} source={picture} resizeMode="cover" />
        <ItemBadge />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>Áo nỉ hoddie trơn đủ màu Unisex</Text>
        <View style={styles.toolContainer}>
          <Text style={styles.itemPrice} numberOfLines={1}>
            99.000.000.000 đ
          </Text>

          <TouchableOpacity>
            <Heart />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.itemDiscountPrice}>99.000 đ</Text>
        </View>
      </View>
    </View>
  </View>
);
export default ProductItem;
