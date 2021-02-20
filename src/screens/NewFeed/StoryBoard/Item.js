import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {ThemeView, Image} from 'components';
import {Avatar} from 'react-native-paper';
import {View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMG = 90;
const HEIGHT_IMG = 140;

const Item = ({item, style}) => {
  return (
    <View style={[styles.itemContainer, style && style]}>
      {/* <Avatar.Image
        source={
          item.logo ? {uri: item.logo} : require('assets/images/default.png')
        }
        size={60}
        rounded
        containerStyle={styles.image}
      /> */}
      <TouchableOpacity style={styles.touchImg}>
        <Image
          key={`productOfStore${item.id}`}
          source={
            item.image
              ? {uri: item.image}
              : require('assets/images/default.png')
          }
          resizeMode="cover"
          style={{height: HEIGHT_IMG, width: WIDTH_IMG}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Item;
