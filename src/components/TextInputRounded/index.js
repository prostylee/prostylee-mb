import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';

const TextInputRounded = ({
  value,
  style,
  hint,
  placeholderTextColor,
  onChangeText,
  defaultValue,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  returnKeyType,
  blurOnSubmit,
  onSubmitEditing,
  textInputStyle,
  editable,
  icon,
  unit,
  multiline,
  onPressIcon,
  disablePressIcon,
  onFocus,
  autoFocus,
  inputRef,
  onBlur,
}) => (
  <View style={[styles.container, style]}>
    <TextInput
      ref={inputRef}
      underlineColorAndroid="transparent"
      style={[styles.textInput, textInputStyle]}
      placeholder={hint}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      value={value}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
      onSubmitEditing={onSubmitEditing}
      onFocus={onFocus}
      editable={editable === false ? false : true}
      multiline={multiline}
      autoFocus={autoFocus}
      onBlur={onBlur}
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

export default TextInputRounded;
