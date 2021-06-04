import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';

import styles from './styles';

import {Colors} from 'components';

import ProductItem from './ProductItem';
import {useDispatch, useSelector} from 'react-redux';

import {
  getPersonalSalersLoadingSelector,
  getPersonalSalersSelector,
  hasPersonalSalersLoadmoreSelector,
  getPersonalSalersCurrentPageSelector,
} from 'redux/selectors/storeMain/personalSalers';

import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const ProductList = ({navigation}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentPage = useSelector((state) =>
    getPersonalSalersCurrentPageSelector(state),
  );
  const isLoading = useSelector((state) =>
    getPersonalSalersLoadingSelector(state),
  );
  const hasLoadmore = useSelector((state) =>
    hasPersonalSalersLoadmoreSelector(state),
  );

  const data = useSelector((state) => getPersonalSalersSelector(state));

  const _handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      storeActions.getPersonalSalers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const _handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        storeActions.getPersonalSalersLoadmore({
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
      ) : !data || !data?.content?.length ? (
        <Text>Không tìm thấy dữ liệu</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={
            data && data?.content?.length
              ? data.content
              : [10, 11, 12, 13, 14, 15, 16, 17]
          }
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onEndReached={_handleLoadMore}
          onRefresh={_handleRefresh}
        />
      )}
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
