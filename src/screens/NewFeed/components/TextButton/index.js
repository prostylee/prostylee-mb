import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const TextButton = ({label, highlight, onClick}) => {

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.textButtonWrapper}>
      <Text style={highlight ? styles.highlight : styles.unHighlight}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

TextButton.defaultProps = {
  highlight: true,
};

TextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  highlight: PropTypes.bool,
};

export default TextButton;