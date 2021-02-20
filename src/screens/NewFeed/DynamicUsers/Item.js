import React, {useState} from 'react';
import {Text, Dimensions, ActivityIndicator} from 'react-native';
import {ThemeView, Image} from 'components';
import {Avatar, Button} from 'react-native-paper';
import i18n from 'i18n';

import styles from './styles';
import {View} from 'native-base';
import {MapPin} from 'svg/common';

import {follow, unfollow} from 'services/api/socialApi';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMG = (WIDTH * 0.7) / 3;
const STORE = 'STORE';
const Item = ({item, style}) => {
  const [followed, setFollowed] = useState(false);
  const products = item?.products;
  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: item?.id,
        targetType: STORE,
      });
      if (res.ok) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: item?.id,
        targetType: STORE,
      });
      if (res.ok) {
        setFollowed(false);
      }
    }
  };
  return (
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
          <Text style={styles.address}>{item?.locationResponse?.address}</Text>
        </View>
      </View>
      <Button
        mode="contained"
        uppercase={false}
        disabled={followed}
        onPress={() => _followPress()}
        style={[styles.followBtn, followed && styles.followedBtn]}
        labelStyle={styles.followBtnBtnLabel}>
        {i18n.t('common.textFollow')}
      </Button>
    </ThemeView>
  );
};

export default Item;
