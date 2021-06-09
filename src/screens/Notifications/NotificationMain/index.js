import styles from './styles';

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {ThemeView, Header, Colors} from 'components';
import {Divider} from 'react-native-paper';
import {
  EmptyNotiOutlined,
  DeleteIcon,
  SeenIcon,
  MapIcon,
} from '../../../svg/common';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import PromotionsInfo from './PromotionsInfo';
import NotificationItem from './NotificationItem';
import i18n from 'i18n';
import {
  SwipeableFlatList,
  SwipeableQuickActions,
} from 'react-native-swipe-list';
import {
  getListNotificationLoadingSelector,
  getListNotificationSelector,
  getLoadListNotificationMoreLoading,
  getHasLoadMoreListNotificationSelector,
  getPageListNotificationSelector,
  deleteNotification,
} from 'redux/selectors/notification.js';
import {
  maskReadNotification,
  deleteNotificationService,
} from 'services/api/notificationApi';

import {notificationActions} from 'redux/reducers';

import {useDispatch, useSelector} from 'react-redux';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {IconButton} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

const Notifications = ({navigation}) => {
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

  const onDeleteNotification = (id) => {
    deleteNotificationService(id)
      .then((res) => {
        if (res.data.status !== 200) {
          showMessage({
            message: `Có lỗi xảy ra, vui lòng thử lại sau!`,
            type: 'danger',
          });
          return;
        }
        dispatch(notificationActions.deleteNotification(id));
        showMessage({
          message: `Xóa thành công`,
          type: 'success',
        });
      })
      .catch((e) => {
        console.log('error', e);
        showMessage({
          message: `Lỗi hệ thống`,
          type: 'danger',
        });
      });
  };

  const markAsRead = (id, read) => {
    if (!read) {
      maskReadNotification(id)
        .then((res) => {
          if (res.data.status !== 200) {
            showMessage({
              message: `Có lỗi xảy ra, không thể đánh dấu đã đọc!`,
              type: 'danger',
            });
            return;
          }
          dispatch(notificationActions.setMarkAsRead(id));
        })
        .catch(() => {
          showMessage({
            message: `Lỗi hệ thống!`,
            type: 'danger',
          });
        });
    }
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        leftComponent={<HeaderLeft />}
        containerStyle={styles.headerContainer}
        rightComponent={<HeaderRight />}
      />
      <Divider />
      <PromotionsInfo
        onPromoNotiPress={() => {
          navigation.navigate('PromoNotification');
        }}
      />
      <Divider />
      {listListNotification && listListNotification.length ? (
        <SwipeableFlatList
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
          renderRightActions={({item}) => (
            <SwipeableQuickActions>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.wrapSeen}>
                  <TouchableOpacity
                    style={styles.buttonSeen}
                    onPress={() => markAsRead(item.id, item.markAsRead)}>
                    <SeenIcon />
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapDelete}>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => onDeleteNotification(item.id)}>
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </SwipeableQuickActions>
          )}
        />
      ) : (
        // <FlatList
        //   data={listListNotification}
        //   renderItem={({item}) => (
        //     <>
        //       <NotificationItem {...item} />
        //       <Divider
        //         style={{
        //           backgroundColor:
        //             item?.status !== 0 ? Colors?.bgColor : Colors?.white,
        //         }}
        //       />
        //     </>
        //   )}
        //   numColumns={1}
        //   keyExtractor={(item, index) => index}
        //   refreshing={refreshing}
        //   onRefresh={handleRefresh}
        //   onEndReached={handleLoadMore}
        //   ListFooterComponent={renderFooter}
        //   showsVerticalScrollIndicator={false}
        //   showsHorizontalScrollIndicator={false}
        // />
        <View style={styles.emptyView}>
          <EmptyNotiOutlined />
          <Text style={styles.emptyText}>{i18n.t('Notification.noData')}</Text>
        </View>
      )}
    </ThemeView>
  );
};
export default Notifications;
