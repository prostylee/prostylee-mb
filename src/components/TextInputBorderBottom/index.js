import React from 'react';
import {TextInput, View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
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
  icon,
  unit,
  onPressIcon,
  disablePressIcon,
  onBlur,
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
      onBlur={onBlur}
    />
    {icon ? (
      <TouchableOpacity
        style={styles.wrapperIcon}
        onPress={onPressIcon}
        disabled={disablePressIcon}>
        {icon}
      </TouchableOpacity>
    ) : null}
    {unit ? <Text style={styles.unitText}>{unit}</Text> : null}
  </View>
);

TextInputBorderBottom.defaultProps = {
  disablePressIcon: false,
  placeholderTextColor: '#BBC0C3',
};

TextInputBorderBottom.propTypes = {
  placeholderTextColor: PropTypes.string,
  unit: PropTypes.string,
  disablePressIcon: PropTypes.bool,
};

export default TextInputBorderBottom;
