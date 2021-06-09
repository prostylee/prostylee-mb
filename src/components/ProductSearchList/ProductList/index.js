import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import ProductItem from './ProductItem';
import {Colors} from 'components';
import {SearchProductLoading} from '../../Loading/contentLoader';
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
