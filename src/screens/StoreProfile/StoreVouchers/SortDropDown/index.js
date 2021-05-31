import React, {useCallback, useState} from 'react';
import {RnRatingTap, Picker} from 'components';
import {
  IconButton,
  Searchbar,
  RadioButton,
  Divider,
  Chip,
} from 'react-native-paper';
import styles from './style';
import {Colors} from 'components';
const MockSortItem = [
  {label: 'Tất cả', value: 0},
  {label: 'Liên quan nhất', value: 1},
  {label: 'Phổ biến nhất', value: 2},
  {label: 'Hàng mới về', value: 3},
  {label: 'Giá thấp', value: 4},
  {label: 'Giá cao nhất', value: 5},
  {label: 'Đánh giá tốt', value: 6},
];

const SortDropDown = ({
  visible = false,
  setVisible = () => {},
  setAction = () => {},
  setValueSort = () => {},
  valueSort,
  options = [],
}) => {
  return (
    <Picker visible={visible} setVisible={setVisible} setAction={setAction}>
      <RadioButton.Group
        value={valueSort}
        onValueChange={(value) => setValueSort(value)}
        color="#823ffd">
        {options?.map((v, i, arr) => (
          <>
            <Divider />
            <RadioButton.Item
              color={Colors['$purple']}
              style={styles.itemContainer}
              value={v.value}
              uncheckedColor={'#fff'}
              labelStyle={[
                styles.labelStyle,
                {
                  color:
                    valueSort === v.value
                      ? Colors['$purple']
                      : Colors['$black'],
                },
              ]}
              label={v.label}
            />
            {/* {i !== arr.length - 1 ? <Divider /> : null} */}
          </>
        ))}
      </RadioButton.Group>
    </Picker>
  );
};
export default SortDropDown;
