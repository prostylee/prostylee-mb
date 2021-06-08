import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import styles from './styles';

import VoucherItem from './VoucherItem';
import {showMessage} from 'react-native-flash-message';
import {Colors} from 'components';
import {
  getVouchersLoadingSelector,
  getVouchersSelector,
  getCurrentVouchersPageSelector,
  hasVouchersLoadmoreSelector,
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

  const _handleSavePress = () => {
    showMessage({
      titleStyle: {fontSize: 13, fontWeight: '500'},
      message: 'Thành công',
      textStyle: {fontSize: 13, fontWeight: '300'},
      description: 'Mã giảm giá đã được lưu',

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
  };
  const _handUsePress = () => {
    navigation.navigate('FlashSale');
  };
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
          contentContainerStyle={styles.listWrapper}
          data={data?.content}
          renderItem={({item, index}) => (
            <VoucherItem
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
        <Text>Không có dữ liệu</Text>
      )}
    </View>
  );
};

VoucherList.defaultProps = {};

VoucherList.propTypes = {};

export default React.memo(VoucherList);
