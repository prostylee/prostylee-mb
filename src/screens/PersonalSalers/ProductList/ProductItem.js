import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';
import picture from '../../../assets/images/signInBg.png';
import {Colors} from 'components';

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
        <Image style={styles.imageStyle} source={picture} resizeMode="cover" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>Áo nỉ hoddie trơn đủ màu Unisex</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 25,
          }}>
          <Text style={styles.itemPrice}>99.000 đ</Text>
          <TouchableOpacity>
            <Heart />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
export default ProductItem;
