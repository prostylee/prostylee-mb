import React from 'react';
import {Picker} from 'components';
import {RadioButton, Divider} from 'react-native-paper';
import styles from './styles';
import {Colors} from 'components';
import PropTypes from 'prop-types';
import {View} from 'react-native';
const SortDropDown = ({
  visible,
  setVisible,

  setValueSort,
  valueSort,
  options,
}) => {
  return (
    <Picker visible={visible} setVisible={setVisible}>
      <RadioButton.Group
        value={valueSort}
        onValueChange={(value) => {
          setValueSort(value);
          setVisible(false);
        }}
        color="#823ffd">
        {options?.map((v, i, arr) => (
          <View key={v?.value}>
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
              mode="ios"
              label={v.label}
              mode="ios"
            />
          </View>
        ))}
      </RadioButton.Group>
    </Picker>
  );
};
SortDropDown.defaultProps = {
  visible: false,
  setVisible: () => {},
  setAction: () => {},
  setValueSort: () => {},
  valueSort: -1,
  options: [],
};

SortDropDown.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setAction: PropTypes.func.isRequired,
  setValueSort: PropTypes.func.isRequired,
  valueSort: PropTypes.number,
  options: PropTypes.array.isRequired,
};

export default SortDropDown;
