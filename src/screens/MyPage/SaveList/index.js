import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from './ProductItem';
import {ThemeView, Header, Colors} from 'components';
import {myPageActions, userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {
  getListProductSavedLoadingSelector,
  getListProductSavedSelector,
  getLoadProductSavedMoreLoadingSelector,
  getHasLoadMoreProductSavedSelector,
  getPageProductSavedSelector,
} from 'redux/selectors/myPage';
import {SearchProductLoading} from 'components/Loading/contentLoader';

const SaveList = (props) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getListProductSavedLoadingSelector(state),
  );

  const savedProductListSelector = useSelector((state) =>
    getListProductSavedSelector(state),
  );

  const page = useSelector((state) => getPageProductSavedSelector(state));

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreProductSavedSelector(state),
  );

  const savedProductList = savedProductListSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadProductSavedMoreLoadingSelector(state),
  );

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListProductSavedLoadmore({
          page: page,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      myPageActions.getListProductSaved({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };
  React.useEffect(() => {
    if (!loading) setIsRefreshing(false);
  }, [loading]);
  React.useEffect(() => {
    dispatch(
      myPageActions.getListProductSaved({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
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
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('mypage.saveList')} />
      <View style={styles.wrapWishList}>
        {loading && !isRefreshing ? (
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 16,
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
            }}>
            {Array.from('x'.repeat(4)).map(() => (
              <SearchProductLoading />
            ))}
          </View>
        ) : savedProductList && savedProductList.length ? (
          <FlatList
            data={savedProductList}
            renderItem={({item, index}) => {
              return (
                <View style={styles.wrapProduct}>
                  <ProductItem
                    index={index}
                    item={item?.productResponseLite}
                    id={item?.id}
                    index={index}
                  />
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
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text style={styles.notFoundText}>
            {i18n.t('Search.resultsNotfound')}
          </Text>
        )}
      </View>
    </ThemeView>
  );
};

export default SaveList;
