import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';

import {Image, Rating, SlideInModal} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';

import {Colors} from 'components';
import {TicketCutLine} from 'svg/common';

import voucher1 from 'assets/images/voucher1.png';
import voucher2 from 'assets/images/voucher1.png';
import voucher3 from 'assets/images/voucher1.png';

import VoucherDetail from '../VoucherDetail';

const ItemTopSide = ({index, item}) => (
  <View style={styles.topSideWrapper}>
    <View style={styles.voucherInfoContainer}>
      <View style={styles.voucherImgWrapper}>
        <Image
          source={
            index % 3 === 1 ? voucher1 : index % 3 === 2 ? voucher2 : voucher3
          }
          style={styles.voucherImg}
        />
      </View>
      <View style={styles.voucerDetailWrapper}>
        <Text style={styles.brandName}>{item?.brand}</Text>
        <Text style={styles.voucherDetail}>{item?.content}</Text>
      </View>
    </View>
  </View>
);
const ItemBottomSide = ({onPress, data}) => (
  <View style={styles.bottomSideWrapper} onPress={onPress}>
    <View style={styles.leftCutPoint} />
    <View style={styles.rightCutPoint} />
    <Text style={styles.expiredDate}>HSD: {data?.expiredDate}</Text>
    <TouchableOpacity style={styles.takeButton} onPress={onPress}>
      <Text style={styles.buttonText}>
        {data?.status === 1 ? 'Sử dụng' : 'Lưu'}
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
          data={item}
          onPress={status === 0 ? onSavePress : onUsePress}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoucherItem;
