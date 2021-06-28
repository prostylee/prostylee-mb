import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';

import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {userActions} from 'redux/reducers';
import Geolocation from '@react-native-community/geolocation';
const useLocation = () => {
  const dispatch = useDispatch();
  const locationRedux =
    useSelector((state) => userSelectors.getUserLocation(state)) || {};
  const [location, setLocation] = useState({
    ...locationRedux,
    lat: locationRedux?.lat,
    lon: locationRedux?.lon,
    address: locationRedux?.address,
  });
  const haveLocation = location?.lat && location?.lon && location?.address;
  useEffect(() => {
    if (!haveLocation) {
      (async () => {
        if (Platform.OS === 'ios') {
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
        console.log('GET LOCATION ERROR', error);
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
              address: addressComponent.formatted_address,
            }),
          );
          setLocation({
            ...location,
            ...addressComponent,
            address: addressComponent.formatted_address,
          });
        })
        .catch((error) => console.log('GET ADDRESS ERROR', error));
    }
  }, [location]);
  return location;
};

export default useLocation;
