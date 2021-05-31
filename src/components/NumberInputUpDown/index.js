import style from './styles';

import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

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
    if (regex.test(currentValue)) {
      if (
        minValue === undefined ||
        minValue === null ||
        currentValue > minValue
      ) {
        const newValue = +currentValue - 1;
        setCurrentValue(newValue);
      }
    }
  };

  const dec = () => {
    if (regex.test(currentValue)) {
      if (
        maxValue === undefined ||
        maxValue === null ||
        currentValue < maxValue
      ) {
        const newValue = +currentValue + 1;
        setCurrentValue(newValue);
      }
    }
  };

  return (
    <View style={{...style.container, ...containerStyle}}>
      <IconButton
        onPress={inc}
        style={{...style.minusIcon, ...minusStyle}}
        size={12}
        icon={minusIcon || 'minus'}
        disabled={+minValue >= +currentValue}
      />

      <TextInput
        editable={editable}
        returnKeyType="done"
        underlineColorAndroid="rgba(0,0,0,0)"
        keyboardType="numeric"
        defaultValue={currentValue.toString()}
        value={currentValue.toString()}
        onChangeText={onChangeValue}
        style={{...style.inputStyle, ...inputStyle}}
        ref={ref || refNumberic}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={true}
        {...rest}
      />
      <IconButton
        onPress={dec}
        style={{...style.plusIcon, ...plusStyle}}
        size={12}
        icon={plusIcon || 'plus'}
        disabled={+maxValue <= +currentValue}
      />
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
