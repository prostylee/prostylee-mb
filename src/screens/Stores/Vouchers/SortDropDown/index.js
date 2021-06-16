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
        onValueChange={(value) => {
          setValueSort(value);
          setVisible(false);
        }}
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
          </>
        ))}
      </RadioButton.Group>
    </Picker>
  );
};
export default SortDropDown;
