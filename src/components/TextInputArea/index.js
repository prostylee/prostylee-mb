import styles from './styles';

import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';

const TextInputArea = ({
  label,
  value,
  styleLabel,
  ipOnChangeText,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  return (
    <View style={styles.containerStyle}>
      <Text
        style={{
          top: isFocused || value ? 0 : 18,
          fontSize: isFocused || value ? 14 : 18,
          ...labelStyle,
        }}>
        {label}
      </Text>
      <TextInput
        value={value}
        autoCorrect={false}
        style={styles.inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline
        {...rest}
      />
    </View>
  );
};

const labelStyle = {
  color: '#8B9399',
  fontFamily: 'System',
  position: 'relative',
  ':after': {
    content: '* ',
    position: 'absolute',
    left: 5,
    top: 0,
    color: '#bbb',
  },
};

export default TextInputArea;
