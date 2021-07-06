/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MapPinFill} from 'svg/common';

import {userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from 'reducers';
import {
  getListCartAddressLoadingSelector,
  getListCartAddressSelector,
  getListCartAddressHistorySelector,
} from 'redux/selectors/cart';
import {userActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';

const HeaderLeft = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const location = useSelector((state) => userSelectors.getUserLocation(state));

  let address = location?.fullAddress || '';

  let length = address.split(',').length;
  address = address
    .split(',')
    .splice(0, length - 3)
    .join(',');
  const _handlePress = () => {
    navigation.navigate('AddressTyping', {
      getListAddressAction: cartActions.getListCartAddress,

      getListAddressSelectorFunc: getListCartAddressSelector,

      getListAddressHistorySelectorFunc: getListCartAddressHistorySelector,

      getListAddressLoadingSelectorFunc: getListCartAddressLoadingSelector,

      setSelectedAddressAction: userActions.setUserLocation,

      setSelectedAddressHistoryAction:
        cartActions.setSelectedCartAddressHistory,
    });
  };
  return (
    <TouchableOpacity style={styles.headerLeftContainer} disabled>
      <MapPinFill color="#E82E46" width={18} height={18} backdropColor="#fff" />
      <Text style={styles.locationText}>
        {address || 'Không thể lấy vị trí'}
      </Text>
    </TouchableOpacity>
  );
};
export default HeaderLeft;
