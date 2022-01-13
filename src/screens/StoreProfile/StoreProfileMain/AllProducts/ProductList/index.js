import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

import ProductListLayout from './ProductList';
import {
  getStoreAllProductLoadingSelector,
  getStoreAllProductSelector,
  getStoreAllProductLoadmoreLoadingSelector,
} from 'redux/selectors/storeProfile';
import {useSelector} from 'react-redux';
import i18n from 'i18n';
import {SearchProductLoading} from 'components/Loading/contentLoader';
const ProductList = ({navigation, layout}) => {
  const loading = useSelector((state) =>
    getStoreAllProductLoadingSelector(state),
  );
  const loadmoreLoading = useSelector((state) =>
    getStoreAllProductLoadmoreLoadingSelector(state),
  );
  const allProductSelector = useSelector((state) =>
    getStoreAllProductSelector(state),
  );
  const productList = allProductSelector?.content || [];

  return (
    <View style={styles.container}>
      {loading && !loadmoreLoading ? (
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 16,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {Array.from(
            'x'.repeat(
              productList?.length > 4 ? Math.floor(productList?.length) : 4,
            ),
          ).map((v, i) => (
            <SearchProductLoading key={i} />
          ))}
        </View>
      ) : productList && productList.length ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 12,
          }}>
          <ProductListLayout
            layout={layout}
            navigation={navigation}
            isLoading={loading && !loadmoreLoading}
            data={productList}
          />
        </View>
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
