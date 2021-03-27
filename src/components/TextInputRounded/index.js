import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const TextInputRounded = (props) => (
  <View style={[styles.container, props.style]}>
    <TextInput
      {...props}
      ref={props.inputRef}
      underlineColorAndroid="transparent"
      style={[styles.textInput, props.textInputStyle]}
      placeholder={props.hint}
    />
    {props.icon ? (
      <View style={styles.wrapperIcon}>
        <TouchableWithoutFeedback
          onPress={props.onPressIcon}
          disabled={props.disablePressIcon}>
          <Image source={props.icon} style={styles.icon} resizeMode="contain" />
        </TouchableWithoutFeedback>
      </View>
    ) : null}
    {props.unit ? <Text style={styles.unitText}>{props.unit}</Text> : null}
  </View>
);

TextInputRounded.defaultProps = {
  secureTextEntry: false,
  autoFocus: false,
  disablePressIcon: false,
  isFocused: false,
};

TextInputRounded.propTypes = {
  placeholderTextColor: PropTypes.string,
  unit: PropTypes.string,
  disablePressIcon: PropTypes.bool,
};

export default TextInputRounded;
