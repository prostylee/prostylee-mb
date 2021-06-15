import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Image, SlideInModal} from 'components';
import styles from './styles';
import voucher1 from 'assets/images/voucher1.png';
import {TicketCutLine, CloseOutLined} from 'svg/common';

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
