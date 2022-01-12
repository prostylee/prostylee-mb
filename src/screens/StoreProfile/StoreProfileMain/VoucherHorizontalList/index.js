import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import parentStyles from '../styles';
import {ChevronRight} from 'svg/common';
import {FlatList} from 'react-native-gesture-handler';
import VoucherItem from './VoucherItem';
import {useDispatch, useSelector} from 'react-redux';
import {storeProfileActions} from 'redux/reducers';
import {getVouchersSelector} from 'redux/selectors/storeProfile';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import i18n from 'i18n';

const VoucherHorizontalList = ({navigation, storeId}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => getVouchersSelector(state));
  const listVoucher = data?.content || [];
  React.useEffect(() => {
    dispatch(
      storeProfileActions.getStoreVouchers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: storeId,
      }),
    );
  }, []);
  if (!listVoucher?.length) {
    return null;
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>{i18n.t('stores.discountCode')}</Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              navigation.navigate('StoreVouchers', {
                storeId: storeId,
              });
            }}>
            <Text style={styles.seeMoreText}>
              {i18n.t('common.textSeeMore')}
            </Text>
            <ChevronRight />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapList}>
          <FlatList
            data={listVoucher}
            horizontal
            renderItem={({item, index}) => (
              <VoucherItem item={item} index={index} />
            )}
            keyExtractor={(item, index) => item.id + '-' + index}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listInner}
          />
        </View>
      </View>
      <View style={parentStyles.divider} />
    </>
  );
};

export default VoucherHorizontalList;
