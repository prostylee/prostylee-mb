import * as React from 'react';
import {Button} from 'react-native-paper';

import styles from './styles';

const ButtonRounded = ({
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

ButtonRounded.defaultProps = {
  mode: 'contained',
  loading: false,
  disabled: false,
  uppercase: false,
  color: '#823FFD',
};

export default ButtonRounded;
