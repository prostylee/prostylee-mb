import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from './ProductItem';
import {ThemeView, Header, Colors} from 'components';
import {myPageActions, userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {
  getListProductLikedLoadingSelector,
  getListProductLikedSelector,
  getLoadProductLikedMoreLoadingSelector,
  getHasLoadMoreProductLikedSelector,
  getPageProductLikedSelector,
} from 'redux/selectors/myPage';

const WishList = (props) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getListProductLikedLoadingSelector(state),
  );

  const likedProductListSelector = useSelector((state) =>
    getListProductLikedSelector(state),
  );

  const page = useSelector((state) => getPageProductLikedSelector(state));

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreProductLikedSelector(state),
  );

  const likedProductList = likedProductListSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadProductLikedMoreLoadingSelector(state),
  );

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListProductLikedLoadmore({
          page: page,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      myPageActions.getListProductLiked({
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
      myPageActions.getListProductLiked({
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
      <Header isDefault title={i18n.t('mypage.wishList')} />
      <View style={styles.wrapWishList}>
        <FlatList
          data={likedProductList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.wrapProduct}>
                <ProductItem index={index} item={item?.product} index={index} />
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
      </View>
    </ThemeView>
  );
};

export default WishList;
