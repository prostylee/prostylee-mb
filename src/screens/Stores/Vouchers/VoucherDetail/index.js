import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Image, SlideInModal} from 'components';
import styles from './styles';
import voucher1 from 'assets/images/voucher1.png';
import {TicketCutLine, CloseOutLined} from 'svg/common';

import {showMessage} from 'react-native-flash-message';

const MockInfo = [
  {
    title: 'Thời gian hiệu lực',
    subTitle: '08.01.2021 00:00 - 13.01.2021 23:59',
  },
  {
    title: 'Chi tiết ưu đãi:',
    subTitle:
      'giảm ngay 50% , tối đa 10000đ cho đơn hàng từ 0đ trên ứng dụng Prostylee. Mã chỉ sử dụng 1 lần. Số lượng voucher có hạn',
  },
  {
    title: 'Sản Phẩm',
    subTitle: 'Tất cả sản phảm',
  },
  {
    title: 'Thanh Toán',
    subTitle: 'Tất cả hình thức thanh toán',
  },
  {
    title: 'Đơn vị vận chuyển',
    subTitle:
      'Giao Hàng Nhanh, VNPost Tiết Kiệm, Viettel Post, Giao Hàng Tiết Kiệm, VNPost Nhanh, J&T Express, GrabExpress, Standard Express - LWE, Standard Express - Doora, Standard Express, Shopee Express, NowShip, Ninja Van, BEST Express, Shopee Express Bulky',
  },
];

const ItemTopSide = ({data}) => (
  <View style={styles.topSideWrapper}>
    <View style={styles.voucherInfoContainer}>
      <View style={styles.voucherImgWrapper}>
        <Image
          source={data?.logo ? {uri: data.logo} : voucher1}
          style={styles.voucherImg}
        />
      </View>
      <View style={styles.voucerDetailWrapper}>
        <Text style={styles.subTitle}>{data?.voucherOwner}</Text>
        <Text style={styles.voucherContent}>{data?.name}</Text>
      </View>
    </View>
  </View>
);
const ItemBottomSide = ({submit, data}) => (
  <View style={styles.bottomSideWrapper}>
    <View style={styles.leftCutPoint} />
    <View style={styles.rightCutPoint} />
    <View style={styles.descriptionWrapper}>
      <ScrollView
        style={styles.description}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {data?.details?.map((item, index) => (
          <View
            style={{
              marginBottom: 20,
            }}
            key={`${item?.title} - ${item?.subTitle}`}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    <View style={styles.takeButtonWrapper}>
      <TouchableOpacity
        style={styles.takeButton}
        onPress={() => {
          submit();
          SlideInModal.hide();
        }}>
        <Text style={styles.buttonText}>
          {data?.status === 1 ? 'Sử dụng ngay' : 'Lưu'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const VoucherDetail = ({data, submit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBrackdrop}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            SlideInModal.hide();
          }}>
          <CloseOutLined color="#fff" width={40} height={40} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBackdrop}>
        <View style={styles.ticketContainer}>
          <ItemTopSide data={data} />
          <TicketCutLine height={3} width={300} />
          <ItemBottomSide data={data} submit={submit} />
        </View>
      </View>
    </View>
  );
};
export default VoucherDetail;
