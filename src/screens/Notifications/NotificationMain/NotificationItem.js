import styles from './styles';

import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors, Image} from 'components';
import cmt1 from 'assets/images/cmt1.jpeg';
import moment from 'moment';
import {
  maskReadNotification,
  deleteNotificationService,
} from 'services/api/notificationApi';
import {notificationActions} from 'redux/reducers';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {DeleteIcon, SeenIcon} from '../../../svg/common';
import {showMessage} from 'react-native-flash-message';
import {DELETE_SUCCESS} from 'constants';
import i18n from 'i18n';

const NotificationItem = ({
  id,
  title = '',
  content = '',
  data,
  createdAt,
  sender,
  markAsRead,
}) => {
  const dispatch = useDispatch();
  const swipeableRef = useRef();

  const onMarkAsRead = () => {
    if (!markAsRead) {
      maskReadNotification(id)
        .then((res) => {
          if (res.data.status !== 200) {
            showMessage({
              message: i18n.t('someThingWrong'),
              type: 'danger',
            });
            return;
          }
          dispatch(notificationActions.setMarkAsRead(id));
        })
        .catch(() => {
          showMessage({
            message: i18n.t('serverError'),
            type: 'danger',
          });
        });
    }
    if (swipeableRef && swipeableRef.current) {
      swipeableRef.current?.close();
    }
  };

  const onDeleteNotification = () => {
    deleteNotificationService(id)
      .then((res) => {
        if (res.data.status !== DELETE_SUCCESS) {
          showMessage({
            message: i18n.t('someThingWrong'),
            type: 'danger',
          });
          return;
        }
        if (swipeableRef && swipeableRef.current) {
          swipeableRef.current?.close();
        }
        dispatch(notificationActions.deleteNotification(id));
        showMessage({
          message: i18n.t('deleteSuccess'),
          type: 'success',
        });
        return;
      })
      .catch((e) => {
        showMessage({
          message: i18n.t('serverError'),
          type: 'danger',
        });
      });
    if (swipeableRef && swipeableRef.current) {
      swipeableRef.current?.close();
    }
  };

  const renderRightButton = () => (
    <View style={{flexDirection: 'row'}}>
      {!markAsRead ? (
        <View style={styles.wrapSeen}>
          <TouchableOpacity
            style={styles.buttonSeen}
            onPress={() => onMarkAsRead(id, markAsRead)}>
            <SeenIcon />
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.wrapDelete}>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => onDeleteNotification(id)}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightButton} ref={swipeableRef}>
      <TouchableOpacity
        style={[
          styles.notiItemContainer,
          {
            backgroundColor: markAsRead
              ? Colors?.['$white']
              : Colors?.['$bgUnReadNoti'],
          },
        ]}
        onPress={onMarkAsRead}
        key={`notify-${id}`}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={
                sender.avatar
                  ? {uri: sender.avatar}
                  : require('assets/images/default.png')
              }
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.notiInfoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.content, {}]} numberOfLines={2}>
            {content}
          </Text>
          <View style={styles.imageListWrapper}>
            {data?.images?.length &&
              data.images.map((item, index, array) =>
                index < 5 ? (
                  <View style={styles.imgContainer}>
                    <Image source={cmt1} style={styles.image} />
                  </View>
                ) : index === 5 ? (
                  <View
                    style={[
                      styles.imgContainer,
                      {
                        backgroundColor: Colors?.['$borderColor'],
                      },
                    ]}>
                    <Image
                      source={cmt1}
                      style={[
                        styles.image,
                        {
                          opacity: 0.5,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.subTitle,
                        {
                          color: Colors?.['$white'],
                          position: 'absolute',
                        },
                      ]}>
                      +{array.length - 5}
                    </Text>
                  </View>
                ) : null,
              )}
          </View>
          <Text style={styles.subTitle}>
            {createdAt
              ? moment(createdAt).format('HH:mm DD-MM-YYYY')
              : moment().format('HH:mm DD-MM-YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

NotificationItem.defaultProps = {
  markAsRead: false,
  data: {},
};

export default NotificationItem;
