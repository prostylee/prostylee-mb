import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import FloatLabelTextInput from 'react-native-floating-label-text-input';
import styles from './styles';

const TextInputFloatingLabel = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <FloatLabelTextInput
        placeholder={props.placeholder}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        keyboardType={props.keyboardType}
        onChangeTextValue={props.onChangeTextValue}
        selectionColor={props.selectionColor}
        containerStyle={[styles.textInput, props.textInputStyle]}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        editable={props.editable}
      />
      {props.icon ? (
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={props.onPressIcon}
          disabled={props.disablePressIcon}>
          {props.icon}
        </TouchableOpacity>
      ) : null}
      {props.unit ? <Text style={styles.unitText}>{props.unit}</Text> : null}
    </View>
  );
};

TextInputFloatingLabel.defaultProps = {
  selectionColor: '#823FFD',
  secureTextEntry: false,
  disablePressIcon: false,
};

export default TextInputFloatingLabel;
