import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';

import {Image, Rating, SlideInModal} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';

import {Colors} from 'components';
import {TicketCutLine} from 'svg/common';

import voucher1 from 'assets/images/voucher1.png';
import voucher2 from 'assets/images/voucher2.png';
import voucher3 from 'assets/images/voucher3.png';

import VoucherDetail from '../VoucherDetail';

const ItemTopSide = ({index, item}) => (
  <View style={styles.topSideWrapper}>
    <View style={styles.voucherInfoContainer}>
      <View style={styles.voucherImgWrapper}>
        <Image
          source={item?.logo ? {uri: item?.logo} : voucher1}
          style={styles.voucherImg}
        />
      </View>
      <View style={styles.voucerDetailWrapper}>
        <Text style={styles.brandName}>{item?.voucherOwner}</Text>
        <Text style={styles.voucherDetail}>{item?.name}</Text>
      </View>
    </View>
  </View>
);
const ItemBottomSide = ({onPress, item}) => (
  <View style={styles.bottomSideWrapper} onPress={onPress}>
    <View style={styles.leftCutPoint} />
    <View style={styles.rightCutPoint} />
    <Text style={styles.expiredDate}>
      HSD: {item?.expiryDate ? item?.expiryDate : '12-12-2020'}
    </Text>
    <TouchableOpacity style={styles.takeButton} onPress={onPress}>
      <Text style={styles.buttonText}>
        {item?.status === 1 ? 'Sử dụng' : 'Lưu'}
      </Text>
    </TouchableOpacity>
  </View>
);
const VoucherItem = ({
  item,
  index,
  onSavePress = () => {},
  onUsePress = () => {},
}) => {
  const handleOpenVoucherDetail = () => {
    SlideInModal.show(() => {},
    <VoucherDetail data={item} submit={status === 0 ? onSavePress : onUsePress} />);
  };
  const {status} = item;
  return (
    <View style={styles.itemWrapper} key={`${item}-${index}`}>
      <TouchableOpacity
        style={styles.itemInner}
        onPress={handleOpenVoucherDetail}>
        <ItemTopSide index={index} item={item} />
        <TicketCutLine height={3} />
        <ItemBottomSide
          item={item}
          onPress={status === 1 ? onUsePress : onSavePress}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoucherItem;
