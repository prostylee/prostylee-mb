import React from 'react';
import {View, Text} from 'react-native';

import {FloatingLabelInput} from 'react-native-floating-label-input';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const TextInputFloatingLabel = (props) => {
  return (
    <View>
      <FloatingLabelInput
        {...props}
        ref={props.ref}
        label={props.placeholder}
        value={props.value}
        onFocus={props.onFocus}
        isFocused={props.isFocused}
        onBlur={props.onBlur}
        staticLabel={props.staticLabel}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        selectionColor={props.selectionColor}
        isPassword={props.secureTextEntry}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        editable={props.editable}
        containerStyles={
          props.isFocused ? styles.containerStylesFocus : styles.containerStyles
        }
        customLabelStyles={{
          colorFocused: EStyleSheet.value('$lightGray'),
          fontSizeFocused: EStyleSheet.value('$normalText'),
        }}
        labelStyles={styles.labelStyles}
        inputStyles={styles.textInput}
        rightComponent={
          props.unit ? <Text style={styles.unitText}>{props.unit}</Text> : null
        }
        customShowPasswordComponent={props.iconShow}
        customHidePasswordComponent={props.iconHide}
      />
    </View>
  );
};

TextInputFloatingLabel.defaultProps = {
  selectionColor: '#823FFD',
  secureTextEntry: false,
  autoFocus: false,
  disablePressIcon: false,
  staticLabel: false,
  isFocused: false,
};

export default TextInputFloatingLabel;
