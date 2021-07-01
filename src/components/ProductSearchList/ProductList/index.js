import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import ProductItem from './ProductItem';

import {SearchProductLoading} from '../../Loading/contentLoader';
import PropTypes from 'prop-types';
import i18n from 'i18n';

const ProductList = ({
  getDataFunction,
  refreshDataFunction,
  loadmoreDataFuntion,
  isLoading,
  hasLoadmore,
  navigation,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const data = getDataFunction();

  const _handleRefresh = () => {
    setIsRefreshing(true);
    refreshDataFunction();
  };

  const _handleLoadMore = () => {
    if (hasLoadmore) {
      loadmoreDataFuntion();
    }
  };

  useEffect(() => {
    if (!isLoading) setIsRefreshing(false);
  }, [isLoading]);
  return (
    <View style={styles.container}>
      {isLoading && !isRefreshing ? (
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 16,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {[1, 2, 3, 4].map((v) => (
            <SearchProductLoading />
          ))}
        </View>
      ) : data && data?.content?.length ? (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={data?.content}
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onEndReached={_handleLoadMore}
          onRefresh={_handleRefresh}
        />
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </View>
  );
};

ProductList.defaultProps = {
  getDataFunction: () => {},
  refreshDataFunction: () => {},
  loadmoreDataFuntion: () => {},
  getCurrentPageFunction: () => {},
  isLoading: false,
  hasLoadmore: false,
  navigation: false,
};

ProductList.propTypes = {
  getDataFunction: PropTypes.func.isRequired,
  refreshDataFunction: PropTypes.func.isRequired,
  loadmoreDataFuntion: PropTypes.func.isRequired,
  getCurrentPageFunction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasLoadmore: PropTypes.bool.isRequired,
  navigation: PropTypes.bool.isRequired,
};

export default React.memo(ProductList);
