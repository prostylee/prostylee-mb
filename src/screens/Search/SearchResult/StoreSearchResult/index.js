import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {Colors, FollowTextButton} from 'components';
import i18n from 'i18n';
import {StoreLoading} from 'components/Loading/contentLoader';
import {
  getStoreSearchLoadingSelector,
  getStoreSearchListSelector,
  hasStoreSearchLoadMoreSelector,
  getStoreSearchLoadmoreLoading,
} from 'redux/selectors/search/storeSearch';

import StoreSearchResultItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {getCurrentKeyword} from 'redux/selectors/search';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Avatar, Text} from 'react-native-paper';
import {searchActions} from 'redux/reducers';
import getDistanceFromLatLonInKm from 'utils/locationUtils';

import {MapPin} from 'svg/common';
import {userSelectors} from 'reducers';

const FeaturedCategories = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);

  const location = useSelector((state) => userSelectors.getUserLocation(state));

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
    handleRefreshing(true);
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
    if (isStoreSearchLoadmoreLoading) {
      return (
        <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      );
    }
    return null;
  };
  useEffect(() => {
    if (!loading) {
      handleRefreshing(false);
    }
  }, [loading]);

  const distanceInKm = (item) => {
    if (
      location &&
      location.lat &&
      location.lon &&
      item?.location?.latitude &&
      item?.location?.longitude
    ) {
      return getDistanceFromLatLonInKm(
        location.lat,
        location.lon,
        item?.location?.latitude,
        item?.location?.longitude,
      );
    } else {
      return i18n.t('undefined') + ' ';
    }
  };
  return (
    <>
      <View style={styles.container}>
        {loading && !refreshing ? (
          <View>
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <StoreLoading />
            ))}
          </View>
        ) : storeList && storeList?.content?.length ? (
          <FlatList
            data={storeList?.content}
            renderItem={({item}) => {
              return (
                <>
                  <TouchableOpacity
                    style={styles.wrapHeader}
                    onPress={() => {
                      navigation.navigate('StoreProfileMain', {
                        storeId: item.id,
                      });
                    }}>
                    <View style={styles.storeWrapper}>
                      <Avatar.Image size={32} source={{uri: item.logoUrl}} />
                      <View style={{marginLeft: 10}}>
                        <Text numberOfLines={1} style={styles.storeName}>
                          {item?.company?.name}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {!item?.isAdvertising ? (
                            <MapPin width={12} height={12} />
                          ) : null}
                          <Text style={styles.isAdvertising}>
                            {item?.isAdvertising
                              ? i18n.t('common.textAdvertisement')
                              : distanceInKm(item) + 'km'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.wrapTextFlow}>
                      <FollowTextButton item={item} />
                    </View>
                  </TouchableOpacity>
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
          <Text>{i18n.t('Search.resultsNotfound')}</Text>
        )}
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
