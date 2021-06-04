import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {ThemeView, Header, Colors} from 'components';
import {Divider} from 'react-native-paper';
import {EmptyNotiOutlined} from '../../../svg/common';
import NotificationItem from './NotificationItem';

import {
  getListNotificationLoadingSelector,
  getListNotificationSelector,
  getLoadListNotificationMoreLoading,
  getHasLoadMoreListNotificationSelector,
  getPageListNotificationSelector,
} from 'redux/selectors/notification/listNotification';

import {notificationActions} from 'redux/reducers';

import i18n from 'i18n';
import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const PromoNotifications = () => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getListNotificationLoadingSelector(state),
  );

  const listListNotificationSelector = useSelector((state) =>
    getListNotificationSelector(state),
  );

  const listListNotification = listListNotificationSelector?.content || [];
  const loadMoreLoading = useSelector((state) =>
    getLoadListNotificationMoreLoading(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreListNotificationSelector(state),
  );

  const page = useSelector((state) => getPageListNotificationSelector(state));

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  useEffect(() => {
    dispatch(
      notificationActions.getListNotification({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        notificationActions.getListNotification({
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
      {listListNotification && listListNotification.length ? (
        <FlatList
          data={listListNotification}
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
