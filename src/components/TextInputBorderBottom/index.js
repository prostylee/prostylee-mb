import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './styles';

const TextInputBorderBottom = ({
  value,
  style,
  textInputStyle,
  hint,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  returnKeyType,
  blurOnSubmit,
  onSubmitEditing,
  maxLength,
  autoFocus,
  editable,
  onFocus,
  inputRef,
  placeholderTextColor,
}) => (
  <View style={[styles.container, style]}>
    <TextInput
      ref={inputRef}
      underlineColorAndroid="transparent"
      style={[styles.textInput, textInputStyle]}
      placeholder={hint}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      value={value}
      maxLength={maxLength}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
      onSubmitEditing={onSubmitEditing}
      autoFocus={autoFocus}
      onFocus={onFocus}
      editable={editable}
      placeholderTextColor={placeholderTextColor}
    />
  </View>
);

export default TextInputBorderBottom;
