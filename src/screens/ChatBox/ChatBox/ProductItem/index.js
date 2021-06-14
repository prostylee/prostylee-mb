import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {currencyFormat} from 'utils/currency';
import styles from './styles';

const Product = (props) => {
  const data = props.data ? props.data : {};
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.navigation.navigate('ProductDetail', {id: data.id});
      }}>
      <View style={styles.productItem}>
        <Image style={styles.image} source={{uri: data?.imageUrls[0] || ''}} />
        <View style={{paddingLeft: 10}}>
          <Text style={{paddingBottom: 5}}>{data?.name}</Text>
          <Text style={styles.priceItem}>
            {currencyFormat(data.priceSale, 'đ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
