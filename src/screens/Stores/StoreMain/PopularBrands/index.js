import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {ChevronRight} from 'svg/common';
import {FlatList} from 'react-native-gesture-handler';
import BrandItem from './BrandItem';

const PopularBrands = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>Thương hiệu nổi bật</Text>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={styles.seeMoreText}>Xem thêm</Text>
          <ChevronRight />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapList}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          horizontal
          renderItem={({item, index}) => <BrandItem key={item} index={index} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listInner}
        />
      </View>
    </View>
  );
};

export default PopularBrands;
