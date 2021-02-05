import React from 'react';
import {
  TextInput,
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
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
      placeholderTextColor={placeholderTextColor || '#BBC0C3'}
    />
    {icon ? (
      <View style={styles.wrapperIcon}>
        <TouchableWithoutFeedback
          onPress={onPressIcon}
          disabled={disablePressIcon === false ? false : true}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </TouchableWithoutFeedback>
      </View>
    ) : null}
    {unit ? <Text style={styles.unitText}>{unit}</Text> : null}
  </View>
);

export default TextInputBorderBottom;
