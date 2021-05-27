import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ThemeView, Header, Colors} from 'components';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import styles from './style';
import SortDropDown from './SortDropDown';
import VoucherList from './VoucherList';

const Vouchers = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(0);
  const sortOptions = [
    {label: 'Tất cả', value: 0},
    {label: 'Liên quan nhất', value: 1},
    {label: 'Phổ biến nhất', value: 2},
    {label: 'Hàng mới về', value: 3},
    {label: 'Giá thấp', value: 4},
    {label: 'Giá cao nhất', value: 5},
    {label: 'Đánh giá tốt', value: 6},
  ];
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title="Mã khuyến mãi" />
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
              {sortOptions[valueSort].label}
            </Text>
            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <SortDropDown
        options={sortOptions}
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={setValueSort}
        valueSort={valueSort}
      />
      <VoucherList />
    </ThemeView>
  );
};
export default Vouchers;
