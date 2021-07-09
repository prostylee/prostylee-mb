import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import styles from './style';
import ProductItem from './ProductItem';
import {SearchProductLoading} from 'components/Loading/contentLoader';
import i18n from 'i18n';
const HEIGHT_ITEM = 320;
const ProductList = ({navigation, isLoading = false, data = []}) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: data?.length
            ? Math.floor(data.length / 2) * HEIGHT_ITEM
            : HEIGHT_ITEM * 2,
        },
      ]}>
      {isLoading ? (
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 16,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {Array.from(
            'x'.repeat(data?.length ? Math.floor(data?.length) : 4),
          ).map((item, index) => (
            <SearchProductLoading key={`${item}-${index}`} />
          ))}
        </View>
      ) : data && data.length ? (
        <View style={styles.listWrapper}>
          {data.map((item, index) => (
            <ProductItem
              item={item}
              index={index}
              navigation={navigation}
              key={`${item.id}-${index}-${item.name}`}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </View>
  );
};

ProductList.defaultProps = {
  isLoading: false,
  data: [],
};

ProductList.propTypes = {};

export default ProductList;
