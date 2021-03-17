/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
} from 'react-native';

import {ImageAnimated as Image} from 'components';

import {Heart} from 'svg/social';

import {IMG_RATIO} from 'constants';

import {currencyFormat} from 'utils/currency';

import styles from './styles';

const {width} = Dimensions.get('window');

const ProductItem = ({wImage, item}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.viewImage}
      onPress={() => {}}>
      <Image
        source={{uri: item.img}}
        resizeMode="cover"
        style={{height: wImage * IMG_RATIO, width: wImage, borderRadius: 4}}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{currencyFormat(item.price, 'đ')}</Text>
        <TouchableOpacity style={styles.likeIcon}>
          <Heart />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

ProductItem.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
};

ProductItem.propTypes = {};

export default ProductItem;
