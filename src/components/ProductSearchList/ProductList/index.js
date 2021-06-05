import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import ProductItem from './ProductItem';
import {Colors} from 'components';

interface ProductListProps {
  getDataFunction: Function;
  refreshDataFunction: Function;
  loadmoreDataFuntion: Function;
  getCurrentPageFunction: Function;
  isLoading: Boolean;
  hasLoadmore: Boolean;
  navigation: Object;
}

const ProductList = ({
  getDataFunction,
  refreshDataFunction,
  loadmoreDataFuntion,
  isLoading,
  hasLoadmore,
  navigation,
}: ProductListProps) => {
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
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      ) : data && data?.content?.length ? (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={data?.content}
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onEndReached={_handleLoadMore}
          onRefresh={_handleRefresh}
        />
      ) : (
        <Text>Không có dữ liệu</Text>
      )}
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
