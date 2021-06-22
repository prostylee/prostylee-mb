import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Image, SlideInModal} from 'components';
import styles from './styles';
import voucher1 from 'assets/images/voucher1.png';
import {TicketCutLine, CloseOutLined} from 'svg/common';
import i18n from 'i18n';
import PropTypes from 'prop-types';

const ItemTopSide = ({data}) => (
  <View style={styles.topSideWrapper}>
    <View style={styles.voucherInfoContainer}>
      <View style={styles.voucherImgWrapper}>
        <Image
          source={
            data?.storeOwner?.logoUrl
              ? {uri: data?.storeOwner?.logoUrl}
              : voucher1
          }
          style={styles.voucherImg}
        />
      </View>
      <View style={styles.voucerDetailWrapper}>
        <Text style={styles.subTitle}>{data?.storeOwner?.name}</Text>
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
        disabled={data?.savedUserVoucherId}
        style={[
          styles.takeButton,
          {
            opacity: data?.savedUserVoucherId ? 0.3 : 1,
          },
        ]}
        onPress={() => {
          submit(data?.id);
          SlideInModal.hide();
        }}>
        <Text style={styles.buttonText}>
          {data?.savedUserVoucherId
            ? i18n.t('voucher.saved')
            : i18n.t('voucher.save')}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const VoucherDetail = ({data, submit}) => {
  const {cndValidFrom, cndValidTo, description} = data;
  const detailData = [
    {
      title: i18n.t('voucher.effectTime'),
      subTitle: cndValidFrom + ' - ' + cndValidTo,
    },
    {title: i18n.t('voucher.voucherDescription'), subTitle: description},
  ];

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
          <ItemBottomSide
            data={{
              ...data,
              details: detailData,
            }}
            submit={submit}
          />
        </View>
      </View>
    </View>
  );
};

VoucherDetail.defaultProps = {
  data: {},
  submit: () => {},
};

VoucherDetail.propTypes = {
  data: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};
export default VoucherDetail;
