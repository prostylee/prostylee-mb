import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './ProductItem';
import i18n from 'i18n';
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

  return (
    <View style={styles.container}>
      {listBestSeller && listBestSeller.length ? (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          style={{width: '100%'}}
          horizontal
          data={listBestSeller}
          numColumns={1}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
