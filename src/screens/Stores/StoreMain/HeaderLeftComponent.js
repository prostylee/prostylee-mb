/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MapPinFill} from 'svg/common';

import {userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import RNLocation from 'react-native-location';

import {userActions} from 'redux/reducers';
import {showMessage} from 'react-native-flash-message';

const HeaderLeft = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => userSelectors.getUserLocation(state));

  let address = location?.address || '';

  let length = address.split(',').length;
  address = address
    .split(',')
    .splice(0, length - 3)
    .join(',');
  const _handleReresheAddress = async () => {
    if (!address) {
      Geocoder.init('AIzaSyDa4XSziMXUFBwRFLto2hT_CBZ9GHbOlkg');

      RNLocation.configure({
        distanceFilter: 100, // Meters
        desiredAccuracy: {
          ios: 'best',
          android: 'highAccuracy',
        },
      });
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
          rationale: {
            title: 'Location permission',
            message: 'We use your location to demo the library',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });

      if (granted) {
        let locations = await RNLocation.getLatestLocation({
          timeout: 5000,
        });
        const json = await Geocoder.from(
          locations.latitude,
          locations.longitude,
        );
        const addressComponent = json.results[0];
        dispatch(
          userActions.setUserLocation({
            ...addressComponent,
            lat: locations.latitude,
            lon: locations.longitude,
            address: addressComponent.formatted_address,
          }),
        );
      } else {
        showMessage({
          message: `Vui lòng cho phép ứng dụng truy cập vào vị trí của bạn trong phần cài đặt`,
          type: 'danger',
        });
        return;
      }
    }
  };
  return (
    <TouchableOpacity
      style={styles.headerLeftContainer}
      onPress={_handleReresheAddress}>
      <MapPinFill color="#E82E46" width={18} height={18} backdropColor="#fff" />
      <Text style={styles.locationText}>{address || 'Khong co dia chi'}</Text>
    </TouchableOpacity>
  );
};
export default HeaderLeft;
