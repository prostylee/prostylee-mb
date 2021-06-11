import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import {Header, ButtonRounded, ThemeView, Colors} from 'components';

import useLocation from '../../../hooks/useLocation';

import MapView, {Marker} from 'react-native-maps';
import styles from './styles';
import {MapPinFill} from 'svg/common';

const Maps = () => {
  const [coordinate, setCoordinate] = useState(null);

  const location = useLocation();
  console.log('LOCATION', location);

  const _handleMapPress = (e) => {
    setCoordinate(e.nativeEvent.coordinate);
    console.log('COORDINATE', e.nativeEvent.coordinate);
  };

  return (
    <ThemeView style={styles.wrapper} isFullView>
      <Header isDefault title="Chọn địa điểm" />
      <View style={styles.cotainer}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lon,
            // latitudeDelta: 0.015,
            // longitudeDelta: 0.0121,
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
          <Text style={styles.title}>Địa chỉ của bạn</Text>
          <View style={{paddingVertical: 10}}>
            <Text style={styles.address}>56 Nguyễn Đình Chiểu</Text>
            <Text style={{color: 'black', fontSize: 14}}>
              Đa Kao, Quận 1, Thành phố Hồ Chí Minh
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <ButtonRounded label="Sử dụng địa chỉ này" />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default Maps;
