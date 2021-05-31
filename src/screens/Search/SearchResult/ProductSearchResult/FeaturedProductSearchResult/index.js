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
import {Text} from 'react-native-paper';

const ResultProductSearchResult = ({navigation}) => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getSearchFeaturedCategoriesLoadingSelector(state),
  );

  const listRightCategoriesSelector = useSelector((state) =>
    getSearchFeaturedCategoriesSelector(state),
  );

  const listRightCategories = listRightCategoriesSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadSearchFeaturedCategoriesMoreLoading(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreSearchFeaturedCategoriesSelector(state),
  );

  const page = useSelector((state) =>
    getPageSearchFeaturedCategoriesSelector(state),
  );

  useEffect(() => {}, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
    }
  };

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return (
        <View style={styles.viewFooterHasResult}>
          <Text
            style={{
              color: '#823FFD',
              lineHeight: 20,
              fontSize: 14,
              fontWeight: '500',
            }}>
            Xem toàn bộ kết quả (167)
          </Text>
        </View>
      );
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
          <Text style={styles.title}>{i18n.t('Search.featuredProduct')}</Text>
        </View>
        <View style={styles.wrapList}>
          <FlatList
            data={[1, 2, 3]}
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
