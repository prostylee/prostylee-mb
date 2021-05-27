import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from '../../../assets/images/slider.png';
import {Image} from 'components';
import {
  DashLine,
  MapIconWithColor,
  TicketIconWithColor,
  BestSellerIcon,
  CartIconColor,
} from 'svg/common';

const FunctionTags = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tagListContainer}>
        <View style={styles.tagItem}>
          <MapIconWithColor />
          <Text style={styles.tagName}>Shop gần đây</Text>
        </View>
        <DashLine />
        <View style={styles.tagItem}>
          <TicketIconWithColor />
          <Text style={styles.tagName}>Mã khuyễn mãi</Text>
        </View>
        <DashLine />
        <View style={styles.tagItem}>
          <BestSellerIcon />
          <Text style={styles.tagName}>Best-seller</Text>
        </View>
        <DashLine />
        <View style={styles.tagItem}>
          <CartIconColor />
          <Text style={styles.tagName}>Cá nhân đăng bán</Text>
        </View>
      </View>
    </View>
  );
};

export default FunctionTags;
