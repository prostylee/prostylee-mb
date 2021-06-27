import React, {useState, useEffect} from 'react';

import Geocoder from 'react-native-geocoding';
import RNLocation from 'react-native-location';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {userActions} from 'redux/reducers';
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
    let locationSubscription = null;
    if (!haveLocation) {
      (async () => {
        RNLocation.configure({
          distanceFilter: 100, // Meters
          desiredAccuracy: {
            ios: 'best',
            android: 'highAccuracy',
          },
        });
        RNLocation.requestPermission({
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
        })
          .then((granted) => {
            if (granted) {
              locationSubscription = RNLocation.subscribeToLocationUpdates(
                (locations) => {
                  setLocation({
                    lat: locations[0].latitude,
                    lon: locations[0].longitude,
                  });
                },
              );
            }
          })
          .catch((err) => {
            console.log('GRANTED PERMISSION ERR', err);
          });
      })();
    }
    return () => {
      locationSubscription && locationSubscription();
    };
  }, []);

  useEffect(() => {
    if (!haveLocation && location.lat && location.lon) {
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
