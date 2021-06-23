import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from 'assets/images/slider1.png';
import {Image, Colors} from 'components';

const MidAdvertisingSlider = ({banners = []}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          autoplayLoopKeepAnimation
          scrollEnabled={false}
          data={banners && banners.length ? banners : [0, 1, 2, 3, 5, 6, 7]}
          showPagination
          paginationStyle={{
            position: 'absolute',
            bottom: -30,
            alignSelf: 'center',
          }}
          paginationStyleItem={{
            width: 6,
            height: 6,
            marginRight: 0,
          }}
          paginationActiveColor={Colors?.['$black']}
          paginationDefaultColor={Colors?.['$line']}
          renderItem={({item, index}) => (
            <View style={styles.sliderItem}>
              <Image
                style={styles.sliderItemImage}
                source={banners && banners.length ? {uri: item} : img}
                resizeMode="cover"
              />
              {/* <Text>{item}</Text> */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MidAdvertisingSlider;
