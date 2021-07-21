import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors, FollowTextButton} from 'components';
import {StoreLoading} from 'components/Loading/contentLoader';
import {
  getHighlightStoreLoadingSelector,
  getHighlightStoreLoadmoreLoadingSelector,
  getHighlightStoreSelector,
  hasHighlightStoreLoadmoreSelector,
  getCurrentHighlightStorePageSelector,
} from 'redux/selectors/storeMain/highlightStore';
import {storeActions} from 'redux/reducers';
import StoreItem from './item';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Text} from 'react-native-paper';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {MapPin} from 'svg/common';
import getDistanceFromLatLonInKm from 'utils/locationUtils';
import {userSelectors} from 'reducers';

import i18n from 'i18n';

import styles from './styles';

const ListStoreHighlight = ({navigation}) => {
  const dispatch = useDispatch();

  const location = useSelector((state) => userSelectors.getUserLocation(state));

  const [isRefreshing, setIsRefreshing] = useState(false);

  const isLoading = useSelector((state) =>
    getHighlightStoreLoadingSelector(state),
  );
  const data = useSelector((state) => getHighlightStoreSelector(state));

  const loadMoreLoading = useSelector((state) =>
    getHighlightStoreLoadmoreLoadingSelector(state),
  );

  const hasLoadMore = useSelector((state) =>
    hasHighlightStoreLoadmoreSelector(state),
  );

  const page = useSelector((state) =>
    getCurrentHighlightStorePageSelector(state),
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      storeActions.getHighlightStore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        storeActions.getHighlightStoreLoadmore({
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
    if (!isLoading) {
      setIsRefreshing(false);
    }
  }, [isLoading]);

  return (
    <>
      <View style={styles.container}>
        {isLoading && !isRefreshing && !loadMoreLoading ? (
          <View style={styles.loadingContainer}>
            {[1, 2, 3, 4].map((v) => (
              <StoreLoading key={v} />
            ))}
          </View>
        ) : data && data?.content?.length ? (
          <FlatList
            data={data.content}
            style={styles.listContainer}
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
                    <View style={styles.parentItem}>
                      <Avatar.Image
                        source={{
                          uri: item?.logoUrl ? item?.logoUrl : null,
                        }}
                        size={32}
                      />

                      <View style={styles.marginLeft10}>
                        <Text numberOfLines={1} style={styles.storeName}>
                          {item?.name}
                        </Text>

                        <View style={styles.locationContainer}>
                          {!item?.isAdvertising ? (
                            <MapPin width={12} height={12} />
                          ) : null}
                          <Text style={styles.isAdvertising}>
                            {item?.isAdvertising
                              ? i18n.t('common.textAdvertisement')
                              : getDistanceFromLatLonInKm(
                                  location?.lat,
                                  location?.lon,
                                  item?.location?.latitude,
                                  item?.location?.longitude,
                                ) + 'km'}
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
                        item?.products && item?.products?.length
                          ? item?.products
                          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                      }
                      renderItem={({item: storeItem, index}) => (
                        <StoreItem item={storeItem} />
                      )}
                      numColumns={1}
                      keyExtractor={(storeItem, index) =>
                        storeItem.id + '-' + index
                      }
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </>
              );
            }}
            numColumns={1}
            keyExtractor={(item, index) => item.id + '-' + index}
            refreshing={isRefreshing}
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
    </>
  );
};

ListStoreHighlight.defaultProps = {};

ListStoreHighlight.propTypes = {};

export default ListStoreHighlight;
