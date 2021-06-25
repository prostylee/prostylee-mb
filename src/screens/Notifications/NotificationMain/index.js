import styles from './styles';

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import {ThemeView, Header, Colors} from 'components';
import {Divider} from 'react-native-paper';
import {EmptyNotiOutlined} from '../../../svg/common';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import PromotionsInfo from './PromotionsInfo';
import NotificationItem from './NotificationItem';
import {NotiLoading} from 'components/Loading/contentLoader';
import i18n from 'i18n';

import {
  getListNotificationLoadingSelector,
  getListNotificationSelector,
  getLoadListNotificationMoreLoading,
  getHasLoadMoreListNotificationSelector,
  getPageListNotificationSelector,
} from 'redux/selectors/notification.js';

import {notificationActions} from 'redux/reducers';

import {useDispatch, useSelector} from 'react-redux';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const Notifications = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const isNotTabbar = route?.params?.isNotTabbar || false;

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getListNotificationLoadingSelector(state),
  );

  const listListNotificationSelector = useSelector(
    (state) => getListNotificationSelector(state),
    () => {},
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
    dispatch(
      notificationActions.getListNotification({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      notificationActions.getListNotification({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);
  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        notificationActions.getListNotificationLoadMore({
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
        leftComponent={<HeaderLeft />}
        containerStyle={styles.headerContainer}
        rightComponent={<HeaderRight />}
        isDefault={isNotTabbar}
        title={isNotTabbar ? i18n.t('bottomTab.notification') : ''}
      />
      <Divider />
      <PromotionsInfo
        onPromoNotiPress={() => {
          navigation.navigate('PromoNotification');
        }}
      />

      {loading && !refreshing ? (
        <View style={styles.loadingContainter}>
          {Array.from('x'.repeat(Math.round(height - 120) / (width / 3))).map(
            () => (
              <NotiLoading width={width * 0.95} height={width / 3} />
            ),
          )}
        </View>
      ) : listListNotification && listListNotification.length ? (
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
          onEndReachedThreshold={0.7}
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
export default Notifications;
