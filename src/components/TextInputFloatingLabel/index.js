import React from 'react';
import {View, Text} from 'react-native';

import {FloatingLabelInput} from 'react-native-floating-label-input';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

const TextInputFloatingLabel = (props) => {
  return (
    <View>
      <FloatingLabelInput
        {...props}
        ref={props.ref}
        label={props.placeholder}
        isPassword={props.secureTextEntry}
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

TextInputFloatingLabel.propTypes = {
  selectionColor: PropTypes.string,
  unit: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disablePressIcon: PropTypes.bool,
  staticLabel: PropTypes.bool,
  isFocused: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
};

export default TextInputFloatingLabel;
