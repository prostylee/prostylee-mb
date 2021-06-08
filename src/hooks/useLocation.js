import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Platform, PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';

const useLocation = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    address: '',
  });
  const requestLocationPermission = async () => {
    Geocoder.init('AIzaSyDIqkfXbjBkSQeAaFZchfHB9k6CzF6ctsI');
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
        } else {
          console.log('ACCESS LOCATION DENIED');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLocation({...location, lon: currentLongitude, lat: currentLatitude});
      },
      (error) => {
        console.log('GET LOCATION ERROR', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  useEffect(() => {
    if (location.lat && location.lon)
      Geocoder.from(location.lat, location.lon)
        .then((json) => {
          var addressComponent = json.results[0].address_components[0];
          console.log('YOUR ADDRESS', addressComponent);
        })
        .catch((error) => console.log('GET ADDRESS ERROR', error));
  }, [location.lat, location.lon]);
  useEffect(() => {
    requestLocationPermission();
  }, []);
  return location;
};

export default useLocation;
