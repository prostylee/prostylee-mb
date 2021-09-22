import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from 'assets/images/adver.png';
import {Image, Colors} from 'components';

const MidAdvertisingSlider = ({data = []}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={4}
          autoplayLoop
          autoplayLoopKeepAnimation
          scrollEnabled
          data={data && data.length ? data : [0]}
          showPagination
          paginationStyle={styles.pagingStyle}
          paginationStyleItem={styles.pagingItemStyle}
          paginationActiveColor={Colors?.['$black']}
          paginationDefaultColor={Colors?.['$line']}
          renderItem={({item, index}) => (
            <View key={`mid_ad_item_${index}`} style={styles.sliderItem}>
              <Image
                style={styles.sliderItemImage}
                source={
                  item.featureImageUrl ? {uri: item.featureImageUrl} : img
                }
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MidAdvertisingSlider;
