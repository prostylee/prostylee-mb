import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
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
          <Text style={styles.itemName}>{item?.name}</Text>
          <View style={styles.toolContainer}>
            <Text style={styles.itemPrice} numberOfLines={1}>
              {currencyFormat(item?.priceSale, 'đ')}
            </Text>

            <ProductLike item={item} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.itemDiscountPrice}>
              {currencyFormat(item?.price, 'đ')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;
