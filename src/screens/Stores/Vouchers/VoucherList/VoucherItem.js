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

const ItemTopSide = ({index, onClick}) => (
  <TouchableOpacity style={styles.topSideWrapper} onPress={onClick}>
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
        <Text style={styles.brandName}>{`Pull&Bear`}</Text>
        <Text style={styles.voucherDetail}>
          Giảm 500k cho đơn hàng từ 1 triệu
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
const ItemBottomSide = ({onClick}) => (
  <TouchableOpacity style={styles.bottomSideWrapper} onPress={onClick}>
    <View style={styles.leftCutPoint} />
    <View style={styles.rightCutPoint} />
    <Text style={styles.expiredDate}>HSD: 12-02-2021</Text>
    <TouchableOpacity style={styles.takeButton}>
      <Text style={styles.buttonText}>Lưu</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);
const VoucherItem = ({item, index}) => {
  const handleOpenVoucherDetail = () => {
    console.log('Voucher Press');
    SlideInModal.show(() => {}, <VoucherDetail />);
  };

  return (
    <View style={styles.itemWrapper} key={`${item}-${index}`}>
      <View style={styles.itemInner}>
        <ItemTopSide index={index} onClick={handleOpenVoucherDetail} />
        <TicketCutLine height={3} />
        <ItemBottomSide onClick={handleOpenVoucherDetail} />
      </View>
    </View>
  );
};

export default VoucherItem;
