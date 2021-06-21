import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'components';
import styles from './style';
import {VoucherPercent} from 'svg/common';

const VoucherItem = ({index, item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.iconWrapper}>
      <VoucherPercent />
    </View>
    <View style={styles.voucherContentWrapper}>
      <Text style={styles.voucherContent} numberOfLines={1}>
        {item?.name}
      </Text>
      <Text style={styles.expiredDate}>EXP: {item?.cndValidTo}</Text>
    </View>
  </View>
);
export default VoucherItem;
