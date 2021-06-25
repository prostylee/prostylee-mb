import {useState, useEffect} from 'react';

import Geocoder from 'react-native-geocoding';
import RNLocation from 'react-native-location';

const useLocation = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    address: '',
  });

  useEffect(() => {
    Geocoder.init('AIzaSyDIqkfXbjBkSQeAaFZchfHB9k6CzF6ctsI');
    let locationSubscription = null;
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

    return () => {
      locationSubscription && locationSubscription();
    };
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      Geocoder.from(location.lat, location.lon)
        .then((json) => {
          const addressComponent = json.results[0].address_components[0];
          console.log('GET ADDRESS SUCCESS', addressComponent);
        })
        .catch((error) => console.log('GET ADDRESS ERROR', error));
    }
  }, [location]);

  return location;
};

export default useLocation;
