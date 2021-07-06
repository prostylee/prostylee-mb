import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';

import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {userActions} from 'redux/reducers';
import Geolocation from '@react-native-community/geolocation';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';

const useLocation = () => {
  const dispatch = useDispatch();
  const locationRedux =
    useSelector((state) => userSelectors.getUserLocation(state)) || {};
  const [location, setLocation] = useState({
    ...locationRedux,
    lat: locationRedux?.lat,
    lon: locationRedux?.lon,
    fullAddress: locationRedux?.fullAddress,
  });
  const haveLocation = location?.lat && location?.lon && location?.fullAddress;
  useEffect(() => {
    if (!haveLocation) {
      (async () => {
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization();
          getOneTimeLocation();
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          }
        }
      })();
    }
  }, []);
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        dispatch(
          userActions.setUserLocation({
            ...location,
            lon: currentLongitude,
            lat: currentLatitude,
          }),
        );
        setLocation({...location, lon: currentLongitude, lat: currentLatitude});
      },
      (error) => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      },
      {
        // enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    if (!haveLocation && location?.lat && location?.lon) {
      Geocoder.from(location.lat, location.lon)
        .then((json) => {
          const addressComponent = json.results[0];
          dispatch(
            userActions.setUserLocation({
              ...location,
              ...addressComponent,
              fullAddress: addressComponent.formatted_address,
            }),
          );
          setLocation({
            ...location,
            ...addressComponent,
            fullAddress: addressComponent.formatted_address,
          });
        })
        .catch((error) => {
          showMessage({
            message: i18n.t('unknownMessage'),
            type: 'success',
            position: 'top',
          });
        });
    }
  }, [location]);
  return location;
};

export default useLocation;
