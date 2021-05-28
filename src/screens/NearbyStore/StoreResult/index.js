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

import StoreSearchResultItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Text} from 'react-native-paper';

const FeaturedCategories = ({navigation}) => {
  const dispatch = useDispatch();
  const followed = false;
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
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({item, index}) => (
            <>
              <View style={styles.wrapHeader}>
                <View
                  style={{
                    height: 65,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Avatar.Image size={32} />
                  <View style={{marginLeft: 10}}>
                    <Text numberOfLines={1} style={styles.storeName}>
                      Pull&Bear
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name="location-outline" color="grey" />
                      <Text style={styles.isAdvertising}>
                        {i18n.t('common.textNear')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.wrapTextFlow}>
                  <Text
                    style={[
                      styles.text,
                      !followed ? styles.textFollow : styles.textFollowed,
                    ]}>
                    {!followed
                      ? i18n.t('common.textFollow')
                      : i18n.t('common.textFollowed')}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapList}>
                <FlatList
                  horizontal
                  data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  renderItem={({item, index}) => (
                    <StoreSearchResultItem
                      index={index}
                      navigation={navigation}
                      item={item}
                    />
                  )}
                  numColumns={1}
                  keyExtractor={(item, index) => index}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </>
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
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
