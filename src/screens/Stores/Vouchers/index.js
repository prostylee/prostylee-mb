import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ThemeView, Header, Colors, SortDropDown} from 'components';
import {Sort, CaretDown} from 'svg/common';
import i18n from 'i18n';
import styles from './style';
// import SortDropDown from './SortDropDown';
import VoucherList from './VoucherList';
import {useDispatch} from 'react-redux';
import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT, VOUCHER_SORT_ITEM} from 'constants';

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
      case 1: {
        sortOption.sorts = 'name';
        break;
      }
      case 2: {
        sortOption.bestSeller = true;
        break;
      }
      case 3: {
        sortOption.sorts = '-createdAt';
        break;
      }
      case 4: {
        sortOption.sorts = '-priceSale';
        break;
      }
      default: {
        sortOption.bestRating = true;
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
              {VOUCHER_SORT_ITEM[valueSort].label}
            </Text>
            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <SortDropDown
        options={VOUCHER_SORT_ITEM}
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={_handleSort}
        valueSort={valueSort}
      />
      <VoucherList navigation={navigation} />
    </ThemeView>
  );
};
export default Vouchers;
