import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import img from 'assets/images/slider1.png';
import {Image, Colors} from 'components';
import {MapPin, TreeDotHorizontal} from 'svg/common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import i18n from 'i18n';
import {
  followStoreService,
  unFollowStoreService,
} from '../../../../services/api/storeApi';
const StoreInfo = ({name = '', address = '', logoUri = '', item = {}}) => {
  const [followed, setFollowed] = React.useState(
    item?.followStatusOfUserLogin ? true : false,
  );
  const _handleClick = async () => {
    let res = null;
    try {
      if (followed) {
        res = await unFollowStoreService(item?.id);
      } else {
        res = await followStoreService(item?.id);
      }
      setFollowed(!followed);
    } catch (err) {
      showMessage({
        message: `${res?.data?.status}: ${res?.data?.error}`,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logoUri ? {uri: logoUri} : img} />
        </View>
        <View style={styles.storeNameWrapper}>
          <Text style={styles.storeName}>{name}</Text>
          <View style={styles.storeAddressWrapper}>
            <MapPin />
            <Text style={styles.storeAddressText}>{address}</Text>
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
