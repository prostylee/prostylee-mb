import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import ProductList from './ProductList';

const BestSeller = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Sản phẩm bán chạy</Text>
    <ProductList />
  </View>
);
export default BestSeller;
