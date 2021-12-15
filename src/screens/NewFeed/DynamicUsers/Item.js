import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {ThemeView} from 'components';
import {Avatar, Button} from 'react-native-paper';
import i18n from 'i18n';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import {MapPin} from 'svg/common';

import {follow, unfollow} from 'services/api/socialApi';

import {SUCCESS} from 'constants';

const Item = ({item, style, targetType}) => {
  const navigation = useNavigation();
  const [followed, setFollowed] = useState(item.followStatusOfUserLogin);
  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: item?.id,
        targetType: targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: item?.id,
        targetType: targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(false);
      }
    }
  };
  const navigateToUserProfile = () => {
    navigation.navigate('UserProfile', {
      userId: item?.userResponseLite?.id,
    });
  };
  const userAddress = item.userAddressResponse
    ? item.userAddressResponse
    : item?.locationResponse?.address;
  return (
    <TouchableOpacity onPress={navigateToUserProfile}>
      <ThemeView colorSecondary style={[styles.itemContainer, style && style]}>
        <Avatar.Image
          source={
            item.avatar
              ? {uri: item.avatar}
              : require('assets/images/default.png')
          }
          size={60}
          rounded
          containerStyle={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item?.fullName}</Text>
          <View style={styles.addressWrap}>
            <MapPin />
            <Text style={styles.address}>
              {userAddress ? userAddress : i18n.t('common.addressHidden')}
            </Text>
          </View>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => _followPress()}
          style={[styles.followBtn, followed && styles.followedBtn]}
          labelStyle={styles.followBtnBtnLabel}>
          {i18n.t(!followed ? 'common.textFollow' : 'common.textFollowed')}
        </Button>
      </ThemeView>
    </TouchableOpacity>
  );
};

export default Item;
