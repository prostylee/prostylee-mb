import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Image, SlideInModal} from 'components';
import i18n from 'i18n';
import styles from './styles';
import {TicketCutLine} from 'svg/common';
import voucher1 from 'assets/images/voucher1.png';
import VoucherDetail from '../VoucherDetail';
import PropTypes from 'prop-types';

const ItemTopSide = ({item}) => (
  <View style={styles.topSideWrapper}>
    <View style={styles.voucherInfoContainer}>
      <View style={styles.voucherImgWrapper}>
        <Image
          source={
            item?.storeOwner?.logoUrl
              ? {uri: item?.storeOwner?.logoUrl}
              : voucher1
          }
          style={styles.voucherImg}
        />
      </View>
      <View style={styles.voucerDetailWrapper}>
        <Text style={styles.brandName}>{item?.storeOwner?.name}</Text>
        <Text style={styles.voucherDetail}>{item?.name}</Text>
      </View>
    </View>
  </View>
);
const ItemBottomSide = ({onPress, item}) => (
  <View style={styles.bottomSideWrapper} onPress={onPress}>
    <View style={styles.leftCutPoint} />
    <View style={styles.rightCutPoint} />
    <Text style={styles.expiredDate}>HSD: {item?.cndValidTo}</Text>
    <TouchableOpacity
      style={[
        styles.takeButton,
        {
          opacity: item?.savedUserVoucherId ? 0.7 : 1,
        },
      ]}
      onPress={() => onPress(item.id,item.savedUserVoucherId)}
      // disabled={item?.savedUserVoucherId ? true : false}
      >
      <Text style={styles.buttonText}>
        {item?.savedUserVoucherId
          ? i18n.t('voucher.saved')
          : i18n.t('voucher.save')}
      </Text>
    </TouchableOpacity>
  </View>
);
const VoucherItem = ({item, onSavePress}) => {
  const handleOpenVoucherDetail = () => {
    SlideInModal.show(() => {},
    <VoucherDetail data={item} submit={onSavePress} />);
  };
  const {status} = item;
  return (
    <View style={styles.itemWrapper} key={`${item.id}-${item.name}`}>
      <TouchableOpacity
        style={styles.itemInner}
        onPress={handleOpenVoucherDetail}>
        <ItemTopSide item={item} />
        <TicketCutLine height={3} />
        <ItemBottomSide item={item} onPress={onSavePress} />
      </TouchableOpacity>
    </View>
  );
};
VoucherItem.defaultProps = {
  item: {},
  onSavePress: () => {},
};

VoucherItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSavePress: PropTypes.func.isRequired,
};

export default VoucherItem;
