import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import {ThemeView, Header, Colors, Image} from 'components';
import {AsRead, TicketOrange} from 'svg/common';
import {Divider} from 'react-native-paper';
import cmt1 from 'assets/images/cmt1.jpeg';
import avatar from 'assets/images/avatar.png';
const HeaderLeft = () => (
  <View style={{width: 100, height: 30}}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 28,
      }}>
      Thông báo
    </Text>
  </View>
);
const HeaderRight = () => (
  <TouchableOpacity>
    <AsRead />
  </TouchableOpacity>
);

const PromotionsInfo = () => (
  <View style={styles.promoInfoContainer}>
    <View style={styles.iconContainer}>
      <TicketOrange />
    </View>
    <View style={styles.promoTextContainer}>
      <Text style={styles.title}>Thông tin khuyễn mãi </Text>
      <Text style={styles.subTitle}>
        Cập nhật các tin tức khuyễn mãi mới nhất
      </Text>
    </View>
  </View>
);
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
        <Image source={avatar} style={styles.avatar} />
      </View>
    </View>
    <View style={styles.notiInfoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.content, {}]} numberOfLines={2}>
        {content}
      </Text>
      <View style={styles.imageListWrapper}>
        {images?.map((item, index) => (
          <View style={styles.imgContainer}>
            <Image source={cmt1} style={styles.image} />
          </View>
        ))}
      </View>
      <Text style={styles.subTitle}>{date}</Text>
    </View>
  </TouchableOpacity>
);

const MockNoti = [
  {
    status: 0,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 0,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 1,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 1,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 0,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 0,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 1,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
  {
    status: 1,
    title: 'Thanh Tâm đã bình luận ảnh của bạn',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
    date: '07:12 20-12-2020',
    images: [1, 2, 3, 4, 5],
  },
];

const Notifications = () => (
  <ScrollView
    style={styles.container}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>
    <Header
      leftComponent={<HeaderLeft />}
      containerStyle={styles.headerContainer}
      rightComponent={<HeaderRight />}
    />
    <Divider />
    <PromotionsInfo />
    <Divider />
    {MockNoti?.map((item, index) => (
      <>
        <NotiItem {...item} />
        <Divider
          style={{
            backgroundColor: item?.status !== 0 ? Colors?.['$bgColor'] : '#fff',
          }}
        />
      </>
    ))}
  </ScrollView>
);
export default Notifications;
