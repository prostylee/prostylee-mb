import * as React from 'react';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './styles';

const TextButton = ({disabled, label, contentStyle, labelStyle, ...props}) => (
  <Button
    contentStyle={[
      styles.button,
      disabled && styles.disabledButton,
      contentStyle,
    ]}
    labelStyle={[
      styles.labelStyle,
      labelStyle,
      disabled && styles.disabledText,
    ]}
    disabled={disabled}
    {...props}>
    {label}
  </Button>
);

TextButton.defaultProps = {
  mode: 'text',
  loading: false,
  disabled: false,
  uppercase: false,
  color: '#fff',
};

TextButton.propTypes = {
  mode: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  color: PropTypes.string,
};

export default TextButton;
