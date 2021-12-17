import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {ThemeView} from 'components';
import {Avatar, Button} from 'react-native-paper';
import i18n from 'i18n';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import {MapPin} from 'svg/common';
import {userSelectors} from 'reducers';
import {follow, unfollow} from 'services/api/socialApi';
import {useSelector} from 'react-redux';

import {SUCCESS} from 'constants';

const Item = ({
  item,
  style,
  targetType,
  allNewFeedsUserFollowed = [],
  followUserAction = () => {},
  unFollowUserAction = () => {},
}) => {
  const navigation = useNavigation();
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const [followed, setFollowed] = useState(
    item.followStatusOfUserLogin || allNewFeedsUserFollowed?.includes(item?.id),
  );
  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: item?.id,
        targetType: targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        followUserAction(item?.id);
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: item?.id,
        targetType: targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        unFollowUserAction(item?.id);
        setFollowed(false);
      }
    }
  };
  const navigateToUserProfile = () => {
    navigation.navigate('UserProfile', {
      userId: item?.id,
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
        {userProfile?.id !== item?.id ? (
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => _followPress()}
            contentStyle={styles.followBtnContent}
            style={[styles.followBtn, followed && styles.followedBtn]}
            labelStyle={styles.followBtnBtnLabel}>
            {i18n.t(!followed ? 'common.textFollow' : 'common.textFollowed')}
          </Button>
        ) : null}
      </ThemeView>
    </TouchableOpacity>
  );
};

export default Item;
