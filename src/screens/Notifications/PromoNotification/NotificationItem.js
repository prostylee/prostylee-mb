import styles from './styles';

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {Colors, Image} from 'components';
import cmt1 from 'assets/images/cmt1.jpeg';
import {CircleTicketOrange} from 'svg/common';

const NotificationItem = ({
  status = 0,
  title = '',
  content = '',
  images = [],
  createdAt = '',
}) => (
  <TouchableOpacity
    style={[
      styles.notiItemContainer,
      {
        backgroundColor: status === 1 ? Colors?.white : Colors?.bgUnReadNoti,
      },
    ]}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatarWrapper}>
        <CircleTicketOrange />
      </View>
    </View>
    <View style={styles.notiInfoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.content, {}]} numberOfLines={2}>
        {content}
      </Text>
      <View style={styles.imageListWrapper}>
        {images?.map((item, index, array) =>
          index < 5 ? (
            <View style={styles.imgContainer}>
              <Image source={cmt1} style={styles.image} />
            </View>
          ) : index === 5 ? (
            <View
              style={[
                styles.imgContainer,
                {
                  backgroundColor: Colors?.borderColor,
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
                    color: Colors?.white,
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

export default NotificationItem;
