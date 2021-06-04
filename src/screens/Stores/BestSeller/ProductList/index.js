import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';

import styles from './styles';

import ProductItem from './ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBestSellersLoadingSelector,
  getBestSellersSelector,
  getCurrentBestSellersPageSelector,
  hasBestSellersLoadmoreSelector,
} from 'redux/selectors/storeMain/bestSellers';

import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Colors} from 'components';

const ProductList = ({navigation}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentPage = useSelector((state) =>
    getCurrentBestSellersPageSelector(state),
  );
  const isLoading = useSelector((state) =>
    getBestSellersLoadingSelector(state),
  );
  const hasLoadmore = useSelector((state) =>
    hasBestSellersLoadmoreSelector(state),
  );

  const data = useSelector((state) => getBestSellersSelector(state));

  const _handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const _handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        storeActions.getBestSellersLoadmore({
          page: currentPage,
          limit: LIMIT_DEFAULT,
        }),
      );
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
