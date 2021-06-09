import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from 'assets/images/slider.jpeg';
import {Image} from 'components';

const AdvertisingSlider = ({data = []}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          autoplayLoopKeepAnimation
          scrollEnabled
          data={data && data.length ? data : [0, 1, 2, 3, 5, 6, 7]}
          showPagination
          paginationStyle={{
            position: 'absolute',
            bottom: -10,
            left: 0,
          }}
          paginationStyleItem={{
            width: 6,
            height: 6,
            marginRight: 0,
          }}
          renderItem={({item, index}) => (
            <View style={styles.sliderItem}>
              <Image
                style={styles.sliderItemImage}
                source={{
                  uri: item?.bannerImageUrl ? item?.bannerImageUrl : img,
                }}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AdvertisingSlider;
