import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from 'assets/images/slider1.png';
import {Image, Colors} from 'components';
import {MapPin, TreeDotHorizontal} from 'svg/common';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StoreInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image />
      </View>
      <View style={styles.storeNameWrapper}>
        <Text style={styles.storeName}>Femi Clothing Store</Text>
        <View style={styles.storeAddressWrapper}>
          <MapPin />
          <Text style={styles.storeAddressText}>Sai gon, Viet Nam</Text>
        </View>
      </View>
      <TreeDotHorizontal />
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.buttonText}>Đã theo dõi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoreInfo;
