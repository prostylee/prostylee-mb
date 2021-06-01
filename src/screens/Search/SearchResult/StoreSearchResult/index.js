/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors, Image} from 'components';
import i18n from 'i18n';

import {
  getStoreSearchLoadingSelector,
  getStoreSearchListSelector,
} from 'redux/selectors/search/storeSearch';

import StoreSearchResultItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Avatar, Text} from 'react-native-paper';
import {searchActions} from 'redux/reducers';

const FeaturedCategories = ({navigation}) => {
  const dispatch = useDispatch();
  const followed = false;
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getStoreSearchLoadingSelector(state));
  const storeList = useSelector((state) => getStoreSearchListSelector(state));

  useEffect(() => {
    dispatch(
      searchActions.getStoreSearch({
        keyword: 'store',
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
      }),
    );
  }, []);

  const handleRefresh = () => {
    // handleRefreshing(true);
  };

  const handleLoadMore = () => {
    // if (hasLoadMore) {
    // }
  };

  const renderFooter = () => {
    // if (!loadMoreLoading) {
    //   return <View style={styles.viewFooter} />;
    // }
    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  // useEffect(() => {
  //   console.log('NEW STORE LIST \n\n', storeList);
  // }, [storeList]);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={storeList}
          renderItem={({item, index}) => {
            console.log('ITEM PRODUCTS', item?.products);
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
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
