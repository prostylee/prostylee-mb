import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import ProductItem from './ProductItem';
import {
  getProductSearchHasLoadmoreSelector,
  getProductSearchLoadmoreLoadingSelector,
  getProductSearchCurrentPageSelector,
  getProductSearchLoadingSelector,
} from 'redux/selectors/search/productSearchMain';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {getCurrentKeyword} from 'redux/selectors/search';
import {ActivityIndicator} from 'react-native-paper';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
const ProductList = ({navigation, data = []}) => {
  const dispatch = useDispatch();

  const hasLoadMore = useSelector((state) =>
    getProductSearchHasLoadmoreSelector(state),
  );
  const isSearchLoading = useSelector((state) =>
    getProductSearchLoadingSelector(state),
  );
  const isLoadMoreLoading = useSelector((state) =>
    getProductSearchLoadmoreLoadingSelector(state),
  );
  const page = useSelector((state) =>
    getProductSearchCurrentPageSelector(state),
  );
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const renderFooter = () => {
    if (isLoadMoreLoading)
      return (
        <View style={styles.viewFooter}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      );
    return null;
  };
  const _handleLoadMore = () => {
    console.log('END REACHED', hasLoadMore, page);
    if (hasLoadMore) {
      dispatch(
        searchActions.getProductsSearchLoadmore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          keyword: currentKeyword,
          type: 'product',
        }),
      );
    }
  };
  const _handleRefresh = () => {
    dispatch(
      searchActions.getProductsSearchLoadmore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: currentKeyword,
        type: 'product',
      }),
    );
  };
  useEffect(() => {
    dispatch(
      searchActions.getProductsSearchLoadmore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: currentKeyword,
        type: 'product',
      }),
    );
  }, [currentKeyword]);
  return (
    <View style={styles.container}>
      {isSearchLoading ? (
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      ) : !data || !data?.content?.length ? (
        <Text style={{color: Colors['$lightGray']}}>
          Không tìm thấy kết quả
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={
            data && data?.content.length
              ? data?.content
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => item.id + '-' + index}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={() => _handleLoadMore()}
          ListFooterComponent={renderFooter}
          refreshing={isSearchLoading}
          onRefresh={_handleRefresh}
        />
      )}
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
