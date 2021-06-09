import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import {SearchProductLoading} from 'components/Loading/contentLoader';
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
import i18n from 'i18n';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {getProductSearchListSelector} from 'redux/selectors/search/productSearchMain';

const ProductList = ({navigation, data = []}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const searchResults = useSelector((state) =>
    getProductSearchListSelector(state),
  );

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
    setIsRefreshing(true);
    dispatch(
      searchActions.getProductsSearch({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: currentKeyword,
        type: 'product',
      }),
    );
  };
  useEffect(() => {
    dispatch(
      searchActions.getProductsSearch({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: currentKeyword,
        type: 'product',
      }),
    );
  }, [currentKeyword]);

  useEffect(() => {
    if (!isSearchLoading) setIsRefreshing(false);
  }, [isSearchLoading]);

  return (
    <View style={styles.container}>
      {isSearchLoading && !isRefreshing ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {[1, 2, 3, 4].map((v) => {
            return (
              <View style={{width: '50%', padding: 16}}>
                <SearchProductLoading />
              </View>
            );
          })}
        </View>
      ) : !searchResults || !searchResults?.content?.length ? (
        <Text style={{color: Colors['$lightGray']}}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={
            searchResults && searchResults?.content.length
              ? searchResults?.content
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => item.id + '-' + index}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={() => _handleLoadMore()}
          ListFooterComponent={renderFooter}
          refreshing={isLoadMoreLoading}
          onRefresh={_handleRefresh}
        />
      )}
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
