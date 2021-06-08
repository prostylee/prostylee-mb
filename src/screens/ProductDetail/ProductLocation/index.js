import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import IconIcons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import i18n from 'i18n';
import {FollowTextButton} from 'components';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const ProductLocation = (props) => {
  const {colors} = useTheme();
  const productId = props.productId ? props.productId : 0;
  const info = props.info ? props.info : {};
  const location = props.location ? props.location : {};
  const address = `${location.address ? location.address : ''}, ${
    location.state ? location.state : ''
  }, ${location.city ? location.city : ''}, ${
    location.country ? location.country : ''
  }`;
  const findPathMapsApp = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${location.latitude},${location.longitude}`;
    const label = address;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <View style={styles.locationName}>
        <View style={styles.nameLeft}>
          <Image source={{uri: info?.logoUrl}} style={styles.infoLogo} />
          <Text style={styles.infoNameText}>{info?.name}</Text>
        </View>
        <FollowTextButton item={{id: productId}} />
      </View>
      <View style={styles.mapPlaceholder}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      <View style={styles.locationDirection}>
        <View style={styles.directionText}>
          <Text style={styles.directionTextStyle}>
            {address}
            <Text style={styles.directionTextStyleStrong}>{` • ${
              location.distance ? location.distance : 0
            }km`}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.directionButton}
          onPress={findPathMapsApp}>
          <IconIcons
            name="paper-plane-outline"
            size={14}
            color={colors['$black']}
          />
          <Text style={styles.directionButtonText}>
            {i18n.t('productDetail.findPath')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductLocation;
