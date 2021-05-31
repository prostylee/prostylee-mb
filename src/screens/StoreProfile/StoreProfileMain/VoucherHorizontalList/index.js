import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {ChevronRight} from 'svg/common';
import {FlatList} from 'react-native-gesture-handler';
import VoucherItem from './VoucherItem';

const VoucherHorizontalList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>Mã giảm giá</Text>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            navigation.navigate('StoreVouchers');
          }}>
          <Text style={styles.seeMoreText}>Xem thêm</Text>
          <ChevronRight />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapList}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          horizontal
          renderItem={({item, index}) => (
            <VoucherItem key={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listInner}
        />
      </View>
    </View>
  );
};

export default VoucherHorizontalList;
