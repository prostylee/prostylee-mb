/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import {ThemeView, Image} from 'components';
import {Avatar, Button} from 'react-native-paper';
import i18n from 'i18n';

import styles from './styles';
import {MapPin} from 'svg/common';

import {follow, unfollow} from 'services/api/socialApi';

import {SUCCESS} from 'constants';
import RootNavigator from '../../../navigator/rootNavigator';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMG = (WIDTH * 0.7) / 3 - 1;

const Item = ({item, style, targetType}) => {
  const [followed, setFollowed] = useState(item.followStatusOfUserLogin);
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

  const goToStore = () => {
    RootNavigator.navigate('StoreProfileMain', {storeId: item.id});
  };

  return (
    <ThemeView colorSecondary style={[styles.itemContainer, style && style]}>
      <TouchableOpacity onPress={goToStore}>
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
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity onPress={goToStore}>
          <Text style={styles.name}>{item?.name}</Text>
        </TouchableOpacity>
        <View style={styles.addressWrap}>
          <MapPin />
          <Text style={styles.address}>{item?.address}</Text>
        </View>
      </View>
      <View style={styles.productImageWrap}>
        {products.length
          ? products.map((product, _i) => (
              <TouchableOpacity
                key={'productOfStore' + targetType + _i}
                onPress={() => {
                  RootNavigator.navigate('ProductDetail', {id: product.id});
                }}>
                <Image
                  source={
                    product?.imageUrl
                      ? {uri: product.imageUrl}
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
              </TouchableOpacity>
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
