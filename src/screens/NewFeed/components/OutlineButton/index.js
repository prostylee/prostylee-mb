import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const OutlineButton = ({label, onClick}) => {
  return (
    <TouchableOpacity style={styles.outlineButton} onPress={onClick}>
      <Text style={styles.outlineLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

OutlineButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OutlineButton;