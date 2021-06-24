import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

import img from 'assets/images/slider1.png';
import {Image} from 'components';
import {MapPin, TreeDotHorizontal} from 'svg/common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';
import {
  followStoreService,
  unFollowStoreService,
} from '../../../../services/api/storeApi';
const StoreInfo = ({storeInfo = {}}) => {
  const [followed, setFollowed] = React.useState(
    storeInfo?.followStatusOfUserLogin ? true : false,
  );
  const _handleClick = async () => {
    let res = null;
    try {
      if (followed) {
        res = await unFollowStoreService(storeInfo?.id);
      } else {
        res = await followStoreService(storeInfo?.id);
      }
      setFollowed(!followed);
    } catch (err) {
      showMessage({
        message: `${res?.data?.status}: ${res?.data?.error}`,
        type: 'danger',
      });
    }
  };
  const logoUrl = storeInfo?.logoUrl ? storeInfo?.logoUrl : '';
  const name = storeInfo?.name ? storeInfo?.name : '';
  const location = storeInfo?.location ? storeInfo?.location : {};

  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logoUrl ? {uri: logoUrl} : img} />
        </View>
        <View style={styles.storeNameWrapper}>
          <Text style={styles.storeName}>{name || ''}</Text>
          <View style={styles.storeAddressWrapper}>
            <MapPin />
            <Text
              numberOfLines={1}
              style={
                styles.storeAddressText
              }>{`${location?.address} ${location?.state}`}</Text>
          </View>
        </View>
      </View>
      <TreeDotHorizontal />
      <TouchableOpacity style={styles.followButton} onPress={_handleClick}>
        <Text style={styles.buttonText}>
          {!followed ? i18n.t('Search.follow') : i18n.t('Search.unfollow')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoreInfo;
