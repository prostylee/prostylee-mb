import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import i18n from 'i18n';
import {HintKeywordLoading} from 'components/Loading/contentLoader';

import styles from './styles';
import {Colors} from 'components';

import {
  getHintProductSearchLoadingSelector,
  getHintProductSearchSelector,
  getLoadHintProductSearchMoreLoading,
  getHasLoadMoreHintProductSearchSelector,
  getPageHintProductSearchSelector,
} from 'redux/selectors/search/hintProductSearch';
import {getCurrentKeyword} from 'redux/selectors/search';
import ResultProductSearchResultItem from './item.js';
import {useDispatch, useSelector} from 'react-redux';

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
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));

  const page = useSelector((state) => getPageHintProductSearchSelector(state));

  const handleRefresh = () => {
    handleRefreshing(true);
    dispatch(
      searchActions.getHintProductSearch({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: currentKeyword,
        type: 'product',
      }),
    );
  };

  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        searchActions.getHintProductSearch({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          keyword: currentKeyword,
          type: 'product',
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
  return (
    <>
      <View style={styles.container}>
        {loading && !refreshing ? (
          <View style={styles.wrapChip}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, _i) => {
              return (
                <HintKeywordLoading style={{height: 32, marginBottom: 8}} />
              );
            })}
          </View>
        ) : listHintProductSearch && listHintProductSearch.length ? (
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
        ) : (
          <Text>{i18n.t('Search.resultsNotfound')}</Text>
        )}
      </View>
    </>
  );
};

ResultProductSearchResult.defaultProps = {};

ResultProductSearchResult.propTypes = {};

export default ResultProductSearchResult;
