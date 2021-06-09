import styles from './styles';

import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors, Image} from 'components';
import cmt1 from 'assets/images/cmt1.jpeg';
import moment from 'moment';
import {maskReadNotification} from 'services/api/notificationApi';
import {notificationActions} from 'redux/reducers';

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
  const maskAsRead = () => {
    if (!markAsRead) {
      maskReadNotification(id)
        .then((res) => {
          if (res.data.status !== 200) {
            console.log('Có lỗi xảy ra, không thể đánh dấu đã đọc');
            return;
          }
          dispatch(notificationActions.setMarkAsRead(id));
        })
        .catch(() => {
          console.log('Lỗi hệ thống');
        });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.notiItemContainer,
        {
          backgroundColor: markAsRead
            ? Colors?.['$white']
            : Colors?.['$bgUnReadNoti'],
        },
      ]}
      onPress={maskAsRead}
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
  );
};

NotificationItem.defaultProps = {
  markAsRead: false,
  data: {},
};

export default NotificationItem;
