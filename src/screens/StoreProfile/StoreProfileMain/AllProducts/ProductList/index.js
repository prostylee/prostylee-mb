import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './ProductItem';
import {
  getStoreAllProductLoadingSelector,
  getStoreAllProductSelector,
  getStoreAllProductLoadmoreLoadingSelector,
} from 'redux/selectors/storeProfile';
import {useSelector} from 'react-redux';

import {SearchProductLoading} from 'components/Loading/contentLoader';
const ITEM_HEIGHT = 320;
const ProductList = ({navigation}) => {
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
    <View
      style={[
        styles.container,
        {
          height: productList?.length
            ? Math.floor(productList.length / 2) * ITEM_HEIGHT
            : 200,
        },
      ]}>
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
              productList?.length ? Math.floor(productList?.length) : 4,
            ),
          ).map((v, i) => (
            <SearchProductLoading key={i} />
          ))}
        </View>
      ) : productList && productList.length ? (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={productList}
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem
              item={item}
              index={index}
              key={`${item?.id}-${index}`}
            />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<></>}
        />
      ) : (
        <Text>Ko co</Text>
      )}
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
