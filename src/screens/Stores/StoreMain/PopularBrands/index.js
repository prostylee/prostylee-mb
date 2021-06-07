import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {ChevronRight} from 'svg/common';
import {FlatList} from 'react-native-gesture-handler';
import BrandItem from './BrandItem';

const PopularBrands = ({data = []}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapBackground,
          {
            backgroundColor: '#fff',
            paddingVertical: 12,
            paddingBottom: 8,
          },
        ]}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Thương hiệu nổi bật</Text>
        </View>
        <View style={styles.wrapList}>
          <FlatList
            data={data && data.length ? data : [1, 2, 3, 4, 5, 6, 7, 8]}
            horizontal
            renderItem={({item, index}) => (
              <BrandItem item={item} index={index} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listInner}
          />
        </View>
      </View>
    </View>
  );
};

export default PopularBrands;
