import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import adverImg from '../../../assets/images/adver.png';
import {Image} from 'components';

const AdvertisingImage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Image
          source={adverImg}
          style={styles.advertisingImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default AdvertisingImage;
