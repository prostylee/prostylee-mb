import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';

import {Colors} from 'components';
import {TicketCutLine} from 'svg/common';

import voucher1 from 'assets/images/voucher1.png';
import voucher2 from 'assets/images/voucher2.png';
import voucher3 from 'assets/images/voucher3.png';

const ItemTopSide = ({index}) => (
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
        <Text style={styles.brandName}>{`Pull&Bear`}</Text>
        <Text style={styles.voucherDetail}>
          Giảm 500k cho đơn hàng từ 1 triệu
        </Text>
      </View>
    </View>
  </View>
);
const ItemBottomSide = () => (
  <View style={styles.bottomSideWrapper}>
    <View style={styles.leftCutPoint} />
    <View style={styles.rightCutPoint} />
    <Text style={styles.expiredDate}>HSD: 12-02-2021</Text>
    <TouchableOpacity style={styles.takeButton}>
      <Text style={styles.buttonText}>Lưu</Text>
    </TouchableOpacity>
  </View>
);
const VoucherItem = ({item, index}) => (
  <View style={styles.itemWrapper} key={`${item}-${index}`}>
    <View style={styles.itemInner}>
      <ItemTopSide index={index} />
      <TicketCutLine height={3} />
      <ItemBottomSide></ItemBottomSide>
    </View>
  </View>
);

export default VoucherItem;
