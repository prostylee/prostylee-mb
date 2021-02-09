import * as React from 'react';
import {Button} from 'react-native-paper';

import styles from './styles';

const ButtonRounded = ({
  disabled,
  label,
  contentStyle,
  labelStyle,
  ...props
}) => (
  <Button
    disabled={disabled}
    contentStyle={[styles.button, contentStyle]}
    style={[styles.buttonWrapper, disabled && styles.disabledButton]}
    labelStyle={[styles.labelStyle, labelStyle]}
    {...props}>
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
