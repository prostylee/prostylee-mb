import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './ProductItem';
import {
  getStoreAllProductLoadingSelector,
  getStoreAllProductSelector,
  getStoreAllProductCurrentPage,
  getStoreAllProductHasLoadmore,
} from 'redux/selectors/storeProfile';
import {useSelector} from 'react-redux';

const ProductList = ({navigation}) => {
  const loading = useSelector((state) =>
    getStoreAllProductLoadingSelector(state),
  );
  const allProductSelector = useSelector((state) =>
    getStoreAllProductSelector(state),
  );
  const productList = allProductSelector?.content || [];

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        data={productList}
        numColumns={2}
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
