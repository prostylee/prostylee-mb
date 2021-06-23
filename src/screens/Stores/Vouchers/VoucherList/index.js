import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Dimensions} from 'react-native';

import i18n from 'i18n';

import styles from './styles';

import VoucherItem from './VoucherItem';
import {showMessage} from 'react-native-flash-message';

import {
  getVouchersLoadingSelector,
  getVouchersSelector,
  getCurrentVouchersPageSelector,
  hasVouchersLoadmoreSelector,
  postSaveVoucherStatusSelector,
} from 'redux/selectors/storeMain/vouchers';

import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {useDispatch, useSelector} from 'react-redux';

import {VouchersLoading} from 'components/Loading/contentLoader';

const VoucherList = ({navigation}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const currentPage = useSelector((state) =>
    getCurrentVouchersPageSelector(state),
  );
  const isLoading = useSelector((state) => getVouchersLoadingSelector(state));
  const hasLoadmore = useSelector((state) =>
    hasVouchersLoadmoreSelector(state),
  );

  const data = useSelector((state) => getVouchersSelector(state));

  const saveStatus = useSelector((state) =>
    postSaveVoucherStatusSelector(state),
  );

  const _handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      storeActions.getVouchers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  const _handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        storeActions.getVouchersLoadmore({
          page: currentPage,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

  useEffect(() => {
    if (!isLoading) setIsRefreshing(false);
  }, [isLoading]);

  const _handleSavePress = (id) => {
    dispatch(storeActions.postSaveVoucher(id));
  };
  const _handUsePress = () => {
    navigation.navigate('FlashSale');
  };

  useEffect(() => {
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
    <View style={styles.container}>
      {isLoading && !isRefreshing ? (
        <View style={{flexDirection: 'column', overflow: 'hidden'}}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((v, i) =>
            v < (SCREEN_HEIGHT - 150) / 125 ? <VouchersLoading /> : null,
          )}
        </View>
      ) : data && data?.content?.length ? (
        <FlatList
          style={styles.listWrapper}
          contentContainerStyle={styles.listInner}
          data={data?.content}
          renderItem={({item, index}) => (
            <VoucherItem
              key={`${item?.name}-${item?.id}`}
              item={item}
              index={index}
              onSavePress={_handleSavePress}
              onUsePress={_handUsePress}
            />
          )}
          keyExtractor={(item, index) => `${item?.name}-${item?.id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onEndReached={_handleLoadMore}
          onRefresh={_handleRefresh}
        />
      ) : (
        <Text style={styles.notfoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </View>
  );
};

VoucherList.defaultProps = {};

VoucherList.propTypes = {};

export default React.memo(VoucherList);
