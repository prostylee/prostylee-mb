/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MapPinFill} from 'svg/common';
import useLocation from 'hooks/useLocation';

const HeaderLeft = () => {
  const location = useLocation();
  let address = location?.address || '';
  address = address.split(',').splice(0, 1).join('');
  return (
    <TouchableOpacity style={styles.headerLeftContainer}>
      <MapPinFill color="#E82E46" width={18} height={18} backdropColor="#fff" />
      <Text style={styles.locationText}>{address}</Text>
    </TouchableOpacity>
  );
};
export default HeaderLeft;
