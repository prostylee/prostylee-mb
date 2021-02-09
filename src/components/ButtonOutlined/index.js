import * as React from 'react';
import {Button} from 'react-native-paper';

import styles from './styles';

const ButtonOutlined = ({
  disabled,
  label,
  contentStyle,
  labelStyle,
  ...props
}) => (
  <Button
    contentStyle={[styles.button, contentStyle]}
    style={[styles.buttonWrapper, disabled && styles.disabledButton]}
    labelStyle={[styles.labelStyle, labelStyle]}
    {...props}>
    {label}
  </Button>
);

ButtonOutlined.defaultProps = {
  mode: 'outlined',
  loading: false,
  disabled: false,
  uppercase: false,
  color: '#fff',
};

export default ButtonOutlined;
