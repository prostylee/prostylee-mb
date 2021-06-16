import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './ProductItem';

import {
  getStoreBestSellerProductLoadingSelector,
  getStoreBestSellerProductSelector,
} from 'redux/selectors/storeProfile';
import {useSelector} from 'react-redux';

const ProductList = ({navigation}) => {
  const loading = useSelector((state) =>
    getStoreBestSellerProductLoadingSelector(state),
  );
  const bestSellerSelector = useSelector((state) =>
    getStoreBestSellerProductSelector(state),
  );
  const listBestSeller = bestSellerSelector?.content || [];
  console.log('DATA BEST SELLER', listBestSeller);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        horizontal
        data={listBestSeller}
        numColumns={1}
        renderItem={({item, index}) => (
          <ProductItem item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
