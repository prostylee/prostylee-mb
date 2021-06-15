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
import {PRODUCT_SORT_ITEM} from 'constant';

const SortDropDown = ({
  visible = false,
  setVisible = () => {},
  setAction = () => {},
  setValueSort = () => {},
  valueSort,
}) => {
  return (
    <Picker visible={visible} setVisible={setVisible} setAction={setAction}>
      <RadioButton.Group
        value={valueSort}
        onValueChange={(value) => {
          setVisible(false);
          setValueSort(value);
        }}
        color="#823ffd">
        {PRODUCT_SORT_ITEM?.map((v, i, arr) => (
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
