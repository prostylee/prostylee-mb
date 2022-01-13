import React from 'react';
import {View, Text} from 'react-native';
import styles from './productStyles';
import ProductItemFull from './ProductItemFull';
import ProductItemGrid from './ProductItemGrid';

import {SearchProductLoading} from 'components/Loading/contentLoader';
import i18n from 'i18n';
const ProductList = ({
  layout = 'full',
  navigation,
  isLoading = false,
  data = [],
}) => {
  const renderItem = (item, index) => {
    switch (layout) {
      case 'full':
        return (
          <ProductItemFull
            item={item}
            index={index}
            navigation={navigation}
            key={`${item.id}-${index}-${item.name}`}
          />
        );
      case 'grid':
        return (
          <ProductItemGrid
            item={item}
            index={index}
            navigation={navigation}
            key={`${item.id}-${index}-${item.name}`}
          />
        );
      default:
        return (
          <ProductItemFull
            item={item}
            index={index}
            navigation={navigation}
            key={`${item.id}-${index}-${item.name}`}
          />
        );
    }
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.listLoadingWrapper}>
          {Array.from(
            'x'.repeat(data?.length ? Math.floor(data?.length) : 4),
          ).map((item, index) => (
            <SearchProductLoading key={`${item}-${index}`} />
          ))}
        </View>
      ) : data && data.length ? (
        <View style={styles.listWrapper}>{data.map(renderItem)}</View>
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </>
  );
};

ProductList.defaultProps = {
  isLoading: false,
  data: [],
};

ProductList.propTypes = {};

export default ProductList;
