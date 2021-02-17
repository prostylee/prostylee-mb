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
                key={`productOfStore${item.id}`}
                source={{
                  uri: item?.imageUrls?.length ? item.imageUrls[0] : null,
                }}
                resizeMode="cover"
                style={{height: WIDTH_IMG, width: WIDTH_IMG}}
                PlaceholderContent={<ActivityIndicator />}
              />
            ))
          : null}
      </View>
      <Button
        mode="contained"
        uppercase={false}
        disabled={followed}
        onPress={() => _followPress()}
        style={styles.followBtn}
        labelStyle={styles.followBtnBtnLabel}>
        {i18n.t('common.textFollow')}
      </Button>
    </ThemeView>
  );
};

export default Item;