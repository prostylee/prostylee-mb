/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors, Image} from 'components';
import i18n from 'i18n';

import {
  getStoreSearchLoadingSelector,
  getStoreSearchListSelector,
  hasStoreSearchLoadMoreSelector,
  getStoreSearchLoadmoreLoading,
} from 'redux/selectors/search/storeSearch';

import StoreSearchResultItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';
import {getCurrentKeyword} from 'redux/selectors/search';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Avatar, Text} from 'react-native-paper';
import {searchActions} from 'redux/reducers';

const FeaturedCategories = ({navigation}) => {
  const dispatch = useDispatch();
  const followed = false;
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getStoreSearchLoadingSelector(state));
  const storeList = useSelector((state) => getStoreSearchListSelector(state));
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const hasLoadMore = useSelector((state) =>
    hasStoreSearchLoadMoreSelector(state),
  );
  const isStoreSearchLoadmoreLoading = useSelector((state) =>
    getStoreSearchLoadmoreLoading(state),
  );

  const handleRefresh = () => {
    dispatch(
      searchActions.getStoreSearch({
        keyword: currentKeyword,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        numberOfProducts: 10,
      }),
    );
  };

  const handleLoadMore = () => {
    console.log('STORE END REAACHED', hasLoadMore);
    if (hasLoadMore) {
      dispatch(
        searchActions.getStoreSearch({
          keyword: currentKeyword,
          page: PAGE_DEFAULT + 1,
          limit: LIMIT_DEFAULT,
          sorts: 'name',
          numberOfProducts: 10,
        }),
      );
    }
  };

  const renderFooter = () => {
    if (isStoreSearchLoadmoreLoading)
      return (
        <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      );
    return null;
  };

  console.log('STORE LIST \n\n\n', storeList);
  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        ) : storeList && storeList?.content?.length ? (
          <FlatList
            data={storeList?.content}
            renderItem={({item, index}) => {
              console.log('ITEM', index, '\n\n\n', item);
              return (
                <>
                  <View style={styles.wrapHeader}>
                    <View
                      style={{
                        height: 65,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Avatar.Image size={32} source={{uri: item.logoUrl}} />
                      <View style={{marginLeft: 10}}>
                        <Text numberOfLines={1} style={styles.storeName}>
                          {item?.company?.name}
                        </Text>
                        <Text style={styles.isAdvertising}>
                          {i18n.t('common.textAdvertisement')}
                        </Text>
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
                      data={
                        item?.products?.length ? item?.products : [1, 2, 3, 4]
                      }
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
              );
            }}
            numColumns={1}
            keyExtractor={(item, index) => index}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={() => handleLoadMore()}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text>Không có kết quả tìm kiếm</Text>
        )}
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
