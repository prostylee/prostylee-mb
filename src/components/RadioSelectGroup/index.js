/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const RadioSelect = ({
  data,
  title,
  value,
  onChange,
  defaultValue,
  styleRadioButton,
  styleContainer,
  styleRadioLabel,
  styleHeader,
  styleTitle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [valueChoose, setValueChoose] = useState(defaultValue || value);

  useEffect(() => {
    setValueChoose(value);
  }, [value]);

  const onChangeValue = (vl) => {
    setValueChoose(vl);
    if (typeof onChange === 'function') {
      onChange(vl);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={{...styles.container, ...styleContainer}} {...rest}>
      {title ? (
        <View style={{...styles.wrapHeader, ...styleHeader}}>
          <Text style={{...styles.wrapTitle, ...styleTitle}}>{title}</Text>
        </View>
      ) : null}

      <View style={{...styles.wrapContent}}>
        {data.map((item) => (
          <TouchableOpacity
            onPress={() => onChangeValue(item.value)}
            key={item.value}
            style={{
              ...styles.radioButton,
              ...styles.styleRadioButton,
              borderColor: valueChoose === item.value ? '#823FFD' : '#E9EAEB',
              backgroundColor: isFocused ? '#823FFD' : '$white',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}>
            <Text
              style={{
                ...styles.radioLabel,
                ...styles.styleRadioLabel,
                color: valueChoose === item.value ? '#823FFD' : '#333333',
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

RadioSelect.defaultProps = {
  data: [],
};

RadioSelect.propTypes = {};

export default RadioSelect;
