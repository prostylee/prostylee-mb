import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {Avatar} from 'react-native-paper';
import {View} from 'react-native';

import styles from './styles';

const WIDTH_IMG = 90;
const HEIGHT_IMG = 140;
const TYPE_STORE = 'STORE';

const Item = ({item, style, targetType}) => {
  return (
    <View style={[styles.itemContainer, style && style]}>
      <View style={styles.touchImg}>
        <Image
          key={'productOfStore' + targetType + item.id}
          source={
            item.image
              ? {uri: item.image}
              : require('assets/images/default.png')
          }
          resizeMode="cover"
          style={{height: HEIGHT_IMG, width: WIDTH_IMG}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.circleImg}>
          <Avatar.Image
            source={
              item.logoUrl || item.avatar
                ? {uri: targetType === TYPE_STORE ? item.logoUrl : item.avatar}
                : require('assets/images/default.png')
            }
            size={26}
            rounded
          />
        </View>
      </View>
    </View>
  );
};

export default Item;
