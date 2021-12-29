import styles from './styles';

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

/*Hooks*/
import {useNavigation, useTheme} from '@react-navigation/native';

/*Components*/
import IconIcons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

/*Transalte*/
import i18n from 'i18n';

/*Components*/
import {FollowTextButton} from 'components';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductLocation = ({productId, info, location}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  let address = `${location.address ? location.address : ''}, ${
    location.state ? location.state : ''
  }, ${location.city ? location.city : ''}, ${
    location.country ? location.country : ''
  }`;
  if (address.length <= 6 && info?.fullAddress) {
    address = info?.fullAddress;
  }

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

  const goToStore = () => {
    navigation.navigate('StoreProfileMain', {storeId: info.id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationName}>
        <TouchableOpacity onPress={goToStore}>
          <View style={styles.nameLeft}>
            <Image source={{uri: info?.logoUrl}} style={styles.infoLogo} />
            <Text style={styles.infoNameText}>{info?.name}</Text>
          </View>
        </TouchableOpacity>
        <FollowTextButton item={{id: info?.id || 0}} />
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
            {address?.length > 6
              ? address
              : i18n.t('productDetail.shopNoAddress')}
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

ProductLocation.defaultProps = {
  productId: 0,
  info: {},
  location: {},
};

ProductLocation.propTypes = {
  productId: PropTypes.number.isRequired,
  info: PropTypes.object,
  location: PropTypes.object,
};

export default ProductLocation;
