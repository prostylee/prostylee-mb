import styles from './styles';

import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {MinusIcon} from 'svg/common';
import {PlusIcon} from '../../svg/common';

const NumberInputUpDown = ({
  value,
  ref,
  containerStyle,
  minusStyle,
  inputStyle,
  plusStyle,
  maxValue,
  minValue,
  regex = /^[0-9]+$/,
  minusIcon,
  plusIcon,
  editable,
  onChange,
  ...rest
}) => {
  const refNumberic = useRef();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(regex.test(value) ? value : 0);
  }, [value]);

  const onChangeValue = (vl) => {
    if (!vl) {
      setCurrentValue(null);
      return;
    }
    if (regex.test(vl)) {
      setCurrentValue(+vl);
      if (typeof onChange === 'function') {
        onChange(+vl);
      }
    }
  };

  const onBlur = () => {};

  const onFocus = () => {};

  const inc = () => {
    if (!currentValue) {
      setCurrentValue('0');
      if (typeof onChange === 'function') {
        onChange(0);
      }
      return;
    }
    if (regex.test(currentValue)) {
      if (
        minValue === undefined ||
        minValue === null ||
        currentValue > minValue
      ) {
        const newValue = +currentValue - 1;
        setCurrentValue(newValue);
        if (typeof onChange === 'function') {
          onChange(+newValue);
        }
      }
    }
  };

  const dec = () => {
    if (!currentValue) {
      setCurrentValue('0');
      if (typeof onChange === 'function') {
        onChange(0);
      }
      return;
    }
    if (regex.test(currentValue)) {
      if (
        maxValue === undefined ||
        maxValue === null ||
        currentValue < maxValue
      ) {
        const newValue = +currentValue + 1;
        setCurrentValue(newValue);
        if (typeof onChange === 'function') {
          onChange(+newValue);
        }
      }
    }
  };

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <TouchableOpacity
        style={{...styles.minusIcon, ...minusStyle}}
        onPress={inc}
        disabled={+minValue >= +currentValue}>
        {minusIcon ? minusIcon : <MinusIcon />}
      </TouchableOpacity>
      <View style={styles.wrapInput}>
        <TextInput
          editable={editable}
          returnKeyType="done"
          underlineColorAndroid="rgba(0,0,0,0)"
          keyboardType="numeric"
          defaultValue={currentValue && currentValue.toString()}
          value={currentValue && currentValue.toString()}
          onChangeText={onChangeValue}
          style={{...styles.inputStyle, ...inputStyle}}
          ref={ref || refNumberic}
          onBlur={onBlur}
          onFocus={onFocus}
          {...rest}
        />
      </View>
      <TouchableOpacity
        onPress={dec}
        style={{...styles.plusIcon, ...plusStyle}}>
        {plusIcon ? plusIcon : <PlusIcon />}
      </TouchableOpacity>
    </View>
  );
};

NumberInputUpDown.propTypes = {};

NumberInputUpDown.defaultProps = {
  value: 0,
  fontSize: 12,
  minValue: 0,
  regex: /^[0-9]+$/,
  editable: true,
};

export default NumberInputUpDown;
