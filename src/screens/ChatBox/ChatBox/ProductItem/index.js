import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {currencyFormat} from 'utils/currency';
import styles from './styles';
import {CURRENCY_VIET_NAM} from 'constants';

const Product = (props) => {
  const data = props.data ? props.data : {};
  const productPriceData =
    data?.price && data?.priceSale
      ? {
          price: data?.price,
          priceSale: data?.priceSale,
        }
      : {
          price: data.productPriceResponseList[0].price || 0,
          priceSale: data.productPriceResponseList[0].priceSale || 0,
        };
  const price = productPriceData.priceSale
    ? data.priceSale
    : data.price
    ? data.price
    : 0;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.navigation.navigate('ProductDetail', {id: data.id});
      }}>
      <View style={styles.productItem}>
        <Image style={styles.image} source={{uri: data?.imageUrls[0] || ''}} />
        <View style={styles.itemTitle}>
          <Text style={styles.itemName}>{data?.name}</Text>
          <Text style={styles.priceItem}>
            {currencyFormat(price, CURRENCY_VIET_NAM)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
