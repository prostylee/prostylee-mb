import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {debounce} from 'lodash';
import {Header, ButtonRounded, ThemeView, Colors} from 'components';

import useLocation from 'hooks/useLocation';

import MapView, {Marker} from 'react-native-maps';
import styles from './styles';
import {MapPinFill} from 'svg/common';
import i18n from 'i18n';
import {useRoute} from '@react-navigation/native';

const Maps = () => {
  const route = useRoute();

  const location = useLocation();

  const pickedLocation = route?.params?.pickedLocation || {};

  const [coordinate, setCoordinate] = useState({
    latitude: pickedLocation?.lat || location?.lat,
    longitude: pickedLocation?.lon || location?.lon,
  });

  console.log('CORODINATE', coordinate, pickedLocation);
  const [address, setAddress] = useState(pickedLocation);

  const _handleMapPress = (e) => {
    setCoordinate(e.nativeEvent.coordinate);
    console.log('CORR', e.nativeEvent.coordinate);
    getAddress(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    );
  };

  const getAddress = debounce(
    async (lat, lon) => {
      try {
        const json = await Geocoder.from(lat, lon);
        console.log('RESPONSE', JSON.stringify(json, null, 2));
        if (json && json?.results?.length) {
          console.log('FORMATED ADDRESS', formatAddress(json.results[0]));
          setAddress(formatAddress(json.results[0]));
        }
      } catch (err) {
        console.log('GET ADDRESS ERR', err);
      }
    },
    1000,
    {trailing: true, leading: false, maxWait: 4000},
  );

  const formatAddress = (result) => {
    let addressNumber = 0,
      street = '',
      districts = '',
      ward = '',
      city = '',
      fullAddress = '',
      lat = 0,
      lon = 0;
    if (
      result &&
      result?.address_components &&
      result?.address_components?.length
    ) {
      result.address_components.map((item) => {
        if (item.types[0] === 'street_number') {
          addressNumber = item.long_name;
        }
        if (item.types[0] === 'route') {
          street = item.long_name;
        }
        if (item.types[0] === 'administrative_area_level_2') {
          districts = item.long_name;
        }
        if (item.types[0] === 'administrative_area_level_1') {
          city = item.long_name;
        }
        return item;
      });
    }
    fullAddress = result?.formatted_address || '';
    lat = result.geometry.location.lat;
    lon = result.geometry.location.lng;
    return {
      addressNumber,
      street,
      districts,
      city,
      fullAddress,
      lat,
      lon,
    };
  };

  return (
    <ThemeView style={styles.wrapper} isFullView>
      <Header isDefault title={i18n.t('addProduct.chooseAddress')} />
      <View style={styles.cotainer}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          initialRegion={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onPress={_handleMapPress}>
          <Marker coordinate={coordinate} pinColor={'red'}>
            <MapPinFill
              width={32}
              height={32}
              backdropColor={Colors['$purple']}
              color={'#fff'}
            />
          </Marker>
        </MapView>
      </View>
      <View style={styles.footer}>
        <View style={styles.textFooter}>
          <Text style={styles.title}>{i18n.t('addProduct.yourAddress')}</Text>
          <View style={{paddingVertical: 10}}>
            <Text style={styles.address}>
              {`${address?.addressNumber} ${address?.street}`}
            </Text>
            <Text style={{color: 'black', fontSize: 14}}>
              {`${address?.districts} ${address?.city}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <ButtonRounded label={i18n.t('addProduct.useAddress')} />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default Maps;
