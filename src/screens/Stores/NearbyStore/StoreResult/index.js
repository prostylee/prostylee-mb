/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {Colors, FollowTextButton} from 'components';
import {StoreLoading} from 'components/Loading/contentLoader';
import {
  getNearbyStoreLoadingSelector,
  getNearbyStoreLoadmoreLoadingSelector,
  getNearbyStoreSelector,
  hasNearbyStoreLoadmoreSelector,
  getCurrentNearbyStorePageSelector,
} from 'redux/selectors/storeMain/nearbyStore';
import {storeActions} from 'redux/reducers';
import StoreSearchResultItem from './item.js';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Text} from 'react-native-paper';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {MapPin} from 'svg/common';
import getDistanceFromLatLonInKm from 'utils/locationUtils';
import useLocation from 'hooks/useLocation';
import styles from './styles';

const FeaturedCategories = ({navigation}) => {
  const dispatch = useDispatch();

  const followed = false;
  const location = useLocation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const isLoading = useSelector((state) =>
    getNearbyStoreLoadingSelector(state),
  );
  const data = useSelector((state) => getNearbyStoreSelector(state));
  const loadMoreLoading = useSelector((state) =>
    getNearbyStoreLoadmoreLoadingSelector(state),
  );

  const hasLoadMore = useSelector((state) =>
    hasNearbyStoreLoadmoreSelector(state),
  );

  const page = useSelector((state) => getCurrentNearbyStorePageSelector(state));

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      storeActions.getNearbyStore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        storeActions.getNearbyStore({
          page: page,
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
  useEffect(() => {
    if (!isLoading) setIsRefreshing(false);
  }, [isLoading]);

  return (
    <>
      <View style={styles.container}>
        {isLoading && !isRefreshing ? (
          <View>
            {[1, 2, 3].map((v) => (
              <StoreLoading />
            ))}
            <StoreLoading />
          </View>
        ) : data && data?.content?.length ? (
          <FlatList
            data={data.content}
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
                    <Avatar.Image
                      source={{
                        uri: item?.logoUrl ? item?.logoUrl : null,
                      }}
                      size={32}
                    />

                    <View style={{marginLeft: 10}}>
                      <Text numberOfLines={1} style={styles.storeName}>
                        {item?.name}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MapPin width={12} height={12} />
                        <Text style={[styles.isAdvertising, {marginLeft: 2}]}>
                          {getDistanceFromLatLonInKm(
                            location.lat,
                            location.lon,
                            item?.location?.latitude,
                            item?.location?.longitude,
                          )}
                          km
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.wrapTextFlow}>
                    <FollowTextButton item={item} />
                  </View>
                </View>
                <View style={styles.wrapList}>
                  <FlatList
                    horizontal
                    data={
                      item?.products && item?.products?.length
                        ? item?.products
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
            )}
            numColumns={1}
            keyExtractor={(item, index) => index}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text>Không có kết quả</Text>
        )}
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
