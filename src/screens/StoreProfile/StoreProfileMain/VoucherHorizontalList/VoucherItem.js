import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import {VoucherPercent} from 'svg/common';

const VoucherItem = ({index}) => (
  <View style={styles.itemContainer}>
    <View style={styles.iconWrapper}>
      <VoucherPercent />
    </View>
    <View style={styles.voucherContentWrapper}>
      <Text style={styles.voucherContent} numberOfLines={1}>
        Giảm 50% cho đơn hàng từ 1 triệu tối đa 500k
      </Text>
      <Text style={styles.expiredDate}>HSD: 12-12-2022</Text>
    </View>
  </View>
);
export default VoucherItem;
