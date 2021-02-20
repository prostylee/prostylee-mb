import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {ThemeView, Image} from 'components';
import {Avatar} from 'react-native-paper';
import {View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMG = (WIDTH * 0.7) / 3;

const Item = ({item, style}) => {
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
    </ThemeView>
  );
};

export default Item;
