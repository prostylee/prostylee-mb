/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import i18n from 'i18n';

import {
  getSearchFeaturedCategoriesLoadingSelector,
  getSearchFeaturedCategoriesSelector,
  getLoadSearchFeaturedCategoriesMoreLoading,
  getHasLoadMoreSearchFeaturedCategoriesSelector,
  getPageSearchFeaturedCategoriesSelector,
} from 'redux/selectors/search';

import FeaturedCategoriesItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Text} from 'react-native-paper';

const FeaturedCategories = ({navigation}) => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getSearchFeaturedCategoriesLoadingSelector(state),
  );
  const listCategoriesSelector = useSelector((state) =>
    getSearchFeaturedCategoriesSelector(state),
  );
  const listCategories = listCategoriesSelector?.content || [];
  const loadMoreLoading = useSelector((state) =>
    getLoadSearchFeaturedCategoriesMoreLoading(state),
  );
  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreSearchFeaturedCategoriesSelector(state),
  );
  const page = useSelector((state) =>
    getPageSearchFeaturedCategoriesSelector(state),
  );

  useEffect(() => {
    dispatch(
      searchActions.getSearchFeaturedCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        searchActions.getSearchFeaturedCategories({
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
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <Text style={styles.title}>{i18n.t('Search.topSearch')}</Text>
        </View>
        {loading && !listCategories.length === 0 ? (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
              ].map((item, _i) => {
                return (
                  <View key={'CategoriesRightLoading' + _i} style={styles.item}>
                    <CategoriesRightLoading />
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.wrapList}>
            <FlatList
              data={listCategories}
              renderItem={({item, index}) => (
                <FeaturedCategoriesItem
                  index={index}
                  navigation={navigation}
                  item={item}
                />
              )}
              numColumns={2}
              keyExtractor={(item, index) => index}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={() => handleLoadMore()}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
