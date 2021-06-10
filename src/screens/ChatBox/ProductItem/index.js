import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './styles';

const Product = (navigaton) => {
  return (
    <View style={styles.productItem}>
      <Image
        style={{width: 30, height: 40, borderRadius: 3}}
        source={require('../../../assets/images/signInBg.png')}
      />
      <View style={{paddingLeft: 10}}>
        <Text style={{paddingBottom: 5}}>Áo flannel xám form rộng</Text>
        <Text style={styles.priceItem}>700.000 đ</Text>
      </View>
    </View>
  );
};

export default Product;
