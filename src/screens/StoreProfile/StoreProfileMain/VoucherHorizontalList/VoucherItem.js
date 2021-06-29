import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';
import {VoucherPercent} from 'svg/common';
import {SlideInModal} from 'components';
import {storeActions} from 'redux/reducers';
import VoucherDetail from '../../StoreVouchers/VoucherDetail';
import {useDispatch, useSelector} from 'react-redux';

import {postSaveVoucherStatusSelector} from 'redux/selectors/storeMain/vouchers';
import {showMessage} from 'react-native-flash-message';

import i18n from 'i18n';
const VoucherItem = ({index, item}) => {
  const dispatch = useDispatch();

  const saveStatus = useSelector((state) =>
    postSaveVoucherStatusSelector(state),
  );
  const onVoucherPress = () => {
    SlideInModal.show(() => {},
    <VoucherDetail data={item} submit={() => onSavePress(item.id)} />);
  };
  const onSavePress = (id) => {
    dispatch(storeActions.postSaveVoucher(id));
  };

  React.useEffect(() => {
    if (saveStatus === 'success') {
      showMessage({
        titleStyle: {fontSize: 13, fontWeight: '500'},
        message: i18n.t('stores.success'),
        textStyle: {fontSize: 13, fontWeight: '300'},
        description: i18n.t('stores.voucherSaved'),

        type: 'success',
        position: {
          top: 40,
          left: 0,
        },
        icon: {icon: 'success', position: 'left'},
        style: {
          alignItems: 'center',
        },
      });
    }
    if (saveStatus === 'failed') {
      showMessage({
        titleStyle: {fontSize: 13, fontWeight: '500'},
        message: i18n.t('stores.failed'),
        textStyle: {fontSize: 13, fontWeight: '300'},
        description: i18n.t('stores.saveFailed'),

        type: 'danger',
        position: {
          top: 40,
          left: 0,
        },
        icon: {icon: 'danger', position: 'left'},
        style: {
          alignItems: 'center',
        },
      });
    }
    dispatch(storeActions.setSaveVoucherStatus(''));
  }, [saveStatus]);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onVoucherPress}>
      <View style={styles.iconWrapper}>
        <VoucherPercent />
      </View>
      <View style={styles.voucherContentWrapper}>
        <Text style={styles.voucherContent} numberOfLines={1}>
          {item?.name}
        </Text>
        <Text style={styles.expiredDate}>EXP: {item?.cndValidTo}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default VoucherItem;
