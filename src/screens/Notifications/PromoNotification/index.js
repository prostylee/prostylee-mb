import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {ThemeView, Header, Colors} from 'components';
import {Divider} from 'react-native-paper';
import {EmptyNotiOutlined} from '../../../svg/common';
import NotificationItem from './NotificationItem';
import {NotiLoading} from 'components/Loading/contentLoader';

import {
  getListNotificationDiscountLoadingSelector,
  getListNotificationDiscountSelector,
  getLoadListNotificationDiscountMoreLoading,
  getHasLoadMoreListNotificationDiscountSelector,
  getPageListNotificationDiscountSelector,
} from 'redux/selectors/notification.js';

import {notificationActions} from 'redux/reducers';

import i18n from 'i18n';
import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const {width, height} = Dimensions.get('window');
const PromoNotifications = () => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getListNotificationDiscountLoadingSelector(state),
  );

  const listNotificationDiscountSelector = useSelector((state) =>
    getListNotificationDiscountSelector(state),
  );

  const listNotification = listNotificationDiscountSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadListNotificationDiscountMoreLoading(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreListNotificationDiscountSelector(state),
  );

  const page = useSelector((state) =>
    getPageListNotificationDiscountSelector(state),
  );

  const handleRefresh = () => {
    handleRefreshing(true);
    dispatch(
      notificationActions.getListNotificationDiscount({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      notificationActions.getListNotificationDiscount({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    handleRefreshing(false);
  }, [dispatch]);
  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);

  const handleLoadMore = () => {
    console.log('PAGE', page, hasLoadMore);
    if (hasLoadMore) {
      dispatch(
        notificationActions.getListNotificationDiscountLoadMore({
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
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={styles.headerContainer}
        title={i18n.t('Notification.titlePromotion')}
      />
      <Divider />

      <Divider />
      {loading && !refreshing ? (
        <View style={styles.loadingContainter}>
          {Array.from('x'.repeat(Math.round(height - 120) / (width / 3))).map(
            () => (
              <NotiLoading width={width * 0.95} height={width / 3} />
            ),
          )}
        </View>
      ) : listNotification && listNotification.length ? (
        <FlatList
          data={listNotification}
          renderItem={({item}) => (
            <>
              <NotificationItem {...item} />
              <Divider
                style={{
                  backgroundColor:
                    item?.status !== 0 ? Colors?.bgColor : Colors?.white,
                }}
              />
            </>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyView}>
          <EmptyNotiOutlined />
          <Text style={styles.emptyText}>{i18n.t('Notification.noData')}</Text>
        </View>
      )}
    </ThemeView>
  );
};
export default PromoNotifications;
