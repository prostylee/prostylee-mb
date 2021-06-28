/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MapPinFill} from 'svg/common';

import {userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {userActions} from 'redux/reducers';

const HeaderLeft = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => userSelectors.getUserLocation(state));

  let address = location?.address || '';

  let length = address.split(',').length;
  address = address
    .split(',')
    .splice(0, length - 3)
    .join(',');

  return (
    <TouchableOpacity style={styles.headerLeftContainer}>
      <MapPinFill color="#E82E46" width={18} height={18} backdropColor="#fff" />
      <Text style={styles.locationText}>
        {address || 'Không thể lấy vị trí'}
      </Text>
    </TouchableOpacity>
  );
};
export default HeaderLeft;
