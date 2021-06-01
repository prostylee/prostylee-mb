import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import {ThemeView, Header, Colors, Image} from 'components';
import {AsRead, TicketOrange, CircleTicketOrange} from 'svg/common';
import {Divider} from 'react-native-paper';
import cmt1 from 'assets/images/cmt1.jpeg';
import {EmptyNotiOutlined} from '../../../svg/common';

const NotiItem = ({
  status = 0,
  title = '',
  content = '',
  images = [],
  date = '',
}) => (
  <TouchableOpacity
    style={[
      styles.notiItemContainer,
      {
        backgroundColor:
          status === 1 ? Colors?.['$white'] : Colors?.['$bgUnReadNoti'],
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
      <Text style={styles.subTitle}>{date}</Text>
    </View>
  </TouchableOpacity>
);

const MockNoti = [];

const PromoNotifications = () => (
  <ThemeView style={styles.container} isFullView>
    <Header
      isDefault
      containerStyle={styles.headerContainer}
      title={'Mã khuyễn mãi'}
    />
    <Divider />

    <Divider />
    {MockNoti && MockNoti.length ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {MockNoti?.map((item, index) => (
          <>
            <NotiItem {...item} key={index} />
            <Divider
              style={{
                backgroundColor:
                  item?.status !== 0 ? Colors?.['$bgColor'] : '#fff',
              }}
            />
          </>
        ))}
      </ScrollView>
    ) : (
      <View style={styles.emptyView}>
        <EmptyNotiOutlined />
        <Text style={styles.emptyText}>
          Hiện tại bạn không có thông báo nào
        </Text>
      </View>
    )}
  </ThemeView>
);
export default PromoNotifications;
