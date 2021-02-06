import * as React from 'react';
import {Button} from 'react-native-paper';

import styles from './styles';

const TextButton = ({
  icon,
  mode,
  onPress,
  color,
  loading,
  disabled,
  label,
  uppercase,
  onLongPress,
  contentStyle,
  style,
  labelStyle,
}) => (
  <Button
    icon={icon}
    mode={mode}
    onPress={onPress}
    color={color}
    disabled={disabled}
    loading={loading}
    uppercase={uppercase}
    onLongPress={onLongPress}
    contentStyle={[
      styles.button,
      disabled && styles.disabledButton,
      contentStyle,
    ]}
    style={style}
    labelStyle={[styles.labelStyle, labelStyle]}>
    {label}
  </Button>
);

TextButton.defaultProps = {
  mode: 'text',
  loading: false,
  disabled: false,
  uppercase: false,
};

export default TextButton;
