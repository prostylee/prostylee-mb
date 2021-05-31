/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';

import {
  getHintProductSearchLoadingSelector,
  getHintProductSearchSelector,
  getLoadHintProductSearchMoreLoading,
  getHasLoadMoreHintProductSearchSelector,
  getPageHintProductSearchSelector,
} from 'redux/selectors/search/hintProductSearch';

import ResultProductSearchResultItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Text} from 'react-native-paper';

const ResultProductSearchResult = ({navigation}) => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getHintProductSearchLoadingSelector(state),
  );

  const listHintProductSearchSelector = useSelector((state) =>
    getHintProductSearchSelector(state),
  );

  const listHintProductSearch = listHintProductSearchSelector?.data || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadHintProductSearchMoreLoading(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreHintProductSearchSelector(state),
  );

  const page = useSelector((state) => getPageHintProductSearchSelector(state));

  const handleRefresh = () => {
    dispatch(
      searchActions.getHintProductSearch({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        searchActions.getHintProductSearch({
          page: page + 1,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

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
  console.log('listHintProductSearch');
  console.log(listHintProductSearch);
  return (
    <>
      <View
        style={[
          styles.container,
          listHintProductSearch.length * 55 < 200
            ? {maxHeight: listHintProductSearch.length * 55}
            : null,
        ]}>
        <View style={styles.wrapList}>
          <FlatList
            data={listHintProductSearch}
            renderItem={({item, index}) => (
              <ResultProductSearchResultItem
                index={index}
                navigation={navigation}
                item={item}
              />
            )}
            numColumns={1}
            keyExtractor={(item, index) => index}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={() => handleLoadMore()}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
};

ResultProductSearchResult.defaultProps = {};

ResultProductSearchResult.propTypes = {};

export default ResultProductSearchResult;
