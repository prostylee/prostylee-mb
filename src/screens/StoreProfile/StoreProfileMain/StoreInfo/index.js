import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from 'assets/images/slider1.png';
import {Image, Colors} from 'components';
import {MapPin, TreeDotHorizontal} from 'svg/common';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StoreInfo = ({name = '', address = '', logoUri = ''}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logoUri ? {uri: logoUri} : img} />
        </View>
        <View style={styles.storeNameWrapper}>
          <Text style={styles.storeName}>{name}</Text>
          <View style={styles.storeAddressWrapper}>
            <MapPin />
            <Text style={styles.storeAddressText}>{address}</Text>
          </View>
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
