/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, Dimensions, ActivityIndicator, View} from 'react-native';
import {ThemeView, Image} from 'components';
import {Avatar, Button} from 'react-native-paper';
import i18n from 'i18n';

import styles from './styles';
import {MapPin} from 'svg/common';

import {follow, unfollow} from 'services/api/socialApi';

import {SUCCESS} from 'constants';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMG = (WIDTH * 0.7) / 3 - 1;

const Item = ({item, style, targetType}) => {
  const [followed, setFollowed] = useState(false);
  const products = item?.products;
  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: item?.id,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: item?.id,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(false);
      }
    }
  };
  return (
    <ThemeView colorSecondary style={[styles.itemContainer, style && style]}>
      <Avatar.Image
        source={
          item.logoUrl
            ? {uri: item.logoUrl}
            : require('assets/images/default.png')
        }
        size={60}
        rounded
        containerStyle={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.addressWrap}>
          <MapPin />
          <Text style={styles.address}>{item?.address}</Text>
        </View>
      </View>
      <View style={styles.productImageWrap}>
        {products.length
          ? products.map((item, _i) => (
              <Image
                key={'productOfStore' + targetType + _i}
                source={
                  item?.imageUrls?.length
                    ? {uri: item.imageUrls[0]}
                    : require('assets/images/default.png')
                }
                resizeMode="cover"
                style={{
                  height: WIDTH_IMG,
                  width: WIDTH_IMG,
                  marginHorizontal: 1,
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
            ))
          : null}
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
  );
};

export default Item;
