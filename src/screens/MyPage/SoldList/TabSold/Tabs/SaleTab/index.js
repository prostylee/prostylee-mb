import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from '../../../ProductItem';
import {myPageActions, userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Colors} from 'components';
import {
  getListProductSaleLoadingSelector,
  getListProductSaleSelector,
  getLoadProductSaleMoreLoadingSelector,
  getHasLoadMoreProductSaleSelector,
  getPageProductSaleSelector,
} from 'redux/selectors/myPage';
import {SearchProductLoading} from 'components/Loading/contentLoader';

const SaleTab = (props) => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getListProductSaleLoadingSelector(state),
  );

  const saleProductListSelector = useSelector((state) =>
    getListProductSaleSelector(state),
  );

  const page = useSelector((state) => getPageProductSaleSelector(state));

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreProductSaleSelector(state),
  );

  const saleProductList = saleProductListSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadProductSaleMoreLoadingSelector(state),
  );

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListProductSaleLoadMore({
          page: page,
          limit: LIMIT_DEFAULT,
          userId: userProfile?.id,
        }),
      );
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      myPageActions.getListProductSale({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        userId: userProfile?.id,
      }),
    );
  };
  React.useEffect(() => {
    if (!loading) setIsRefreshing(false);
  }, [loading]);
  React.useEffect(() => {
    dispatch(
      myPageActions.getListProductSale({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        userId: userProfile?.id,
      }),
    );
  }, []);
  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }
    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  return loading && !isRefreshing ? (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: 16,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      }}>
      {Array.from('x'.repeat(4)).map((v, index) => (
        <SearchProductLoading key={index} />
      ))}
    </View>
  ) : saleProductList && saleProductList.length ? (
    <FlatList
      data={saleProductList}
      renderItem={({item, index}) => {
        return (
          <View style={styles.wrapProduct}>
            <ProductItem index={index} item={item} />
          </View>
        );
      }}
      numColumns={2}
      scrollEventThrottle={1}
      keyExtractor={(_, index) => `coordinated_product_${index}`}
      style={styles.listContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      contentContainerStyle={styles.listInner}
      ListFooterComponent={renderFooter}
    />
  ) : (
    <Text style={styles.notFoundText}>{i18n.t('Search.resultsNotfound')}</Text>
  );
};

export default SaleTab;
