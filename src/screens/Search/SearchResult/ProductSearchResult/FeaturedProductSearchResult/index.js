import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import i18n from 'i18n';

import {
  getFeaturedProductSearchLoadingSelector,
  getFeaturedProductSearchSelector,
  getLoadFeaturedProductSearchMoreLoading,
  getHasLoadMoreFeaturedProductSearchSelector,
  getPageFeaturedProductSearchSelector,
} from 'redux/selectors/search/featuredProductSearch';
import {getCurrentKeyword} from 'redux/selectors/search';

import FeaturedCategoriesItem from './item.js';
import {searchActions} from 'redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native-paper';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const ResultProductSearchResult = ({navigation}) => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const loading = useSelector((state) =>
    getFeaturedProductSearchLoadingSelector(state),
  );

  const listFeaturedProductSearchSelector = useSelector((state) =>
    getFeaturedProductSearchSelector(state),
  );

  const listFeaturedProductSearch =
    listFeaturedProductSearchSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadFeaturedProductSearchMoreLoading(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreFeaturedProductSearchSelector(state),
  );

  const page = useSelector((state) =>
    getPageFeaturedProductSearchSelector(state),
  );

  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);

  useEffect(() => {
    handleRefresh();
  }, []);
  const handleRefresh = () => {
    handleRefreshing(true);
    dispatch(
      searchActions.getFeaturedProductSearch({
        keyword: currentKeyword,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        searchActions.getFeaturedProductSearch({
          keyword: currentKeyword,
          page: page + 1,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

  const renderFooter = () => {
    if (loadMoreLoading) {
      return (
        <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      );
    }
    return null;
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <Text style={styles.title}>{i18n.t('Search.featuredProduct')}</Text>
        </View>
        <View style={styles.wrapList}>
          {listFeaturedProductSearch && listFeaturedProductSearch.length ? (
            <FlatList
              style={styles.wrapListInner}
              data={listFeaturedProductSearch}
              renderItem={({item, index}) => (
                <FeaturedCategoriesItem
                  index={index}
                  navigation={navigation}
                  item={item}
                />
              )}
              numColumns={1}
              keyExtractor={(item, index) => index}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={handleLoadMore}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text>{i18n.t('Search.resultsNotfound')}</Text>
          )}
        </View>
      </View>
    </>
  );
};

ResultProductSearchResult.defaultProps = {};

ResultProductSearchResult.propTypes = {};

export default ResultProductSearchResult;
