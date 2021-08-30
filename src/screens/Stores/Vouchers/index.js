import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Dimensions, Platform} from 'react-native';
import {ThemeView, Header, Colors, SortDropDown} from 'components';
import {Sort, CaretDown} from 'svg/common';
import i18n from 'i18n';
import styles from './style';

import VoucherList from './VoucherList';
import {useDispatch} from 'react-redux';
import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT, VOUCHER_SORT_ITEM} from 'constants';

import {getStatusBarHeight} from 'react-native-status-bar-height';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOTTOM_HEADER_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
const HEIGHT_HEADER = BOTTOM_HEADER_HEIGHT / 2 + 50 + getStatusBarHeight();
const Vouchers = ({navigation}) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(0);

  const _handleSort = (value) => {
    setVisible(false);
    setValueSort(value);

    let sortOption = {};
    switch (value) {
      case 0: {
        break;
      }
      case 1: {
        sortOption.storeId = 0;
        break;
      }
      case 2: {
        sortOption.sorts = 'bestDiscount';
        break;
      }
      case 3: {
        sortOption.sorts = 'expiredDate';
        break;
      }
      default: {
        sortOption.sorts = 'mostUsed';
        break;
      }
    }
    dispatch(
      storeActions.getVouchers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      storeActions.getVouchers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);
  const sortStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: WIDTH,
    height: visible ? HEIGHT : 0,
    marginTop: visible ? HEIGHT_HEADER : 0,
  };
  console.log('---------------------------------')
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('stores.voucherCode')} />
      <View style={styles.wrapBlockOne}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.contentBlockOne}>
            <View>
              <Sort />
            </View>
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('sort')}:
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.textSort,
                {
                  color: Colors['$black'],
                },
              ]}>
              {VOUCHER_SORT_ITEM[valueSort]?.label}
            </Text>
            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={sortStyle}>
        <SortDropDown
          options={VOUCHER_SORT_ITEM}
          visible={visible}
          setVisible={setVisible}
          // setAction={setAction}
          setValueSort={_handleSort}
          valueSort={valueSort}
        />
      </View>
      <VoucherList navigation={navigation} />
    </ThemeView>
  );
};
export default Vouchers;
