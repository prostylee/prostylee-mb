import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {Image, ProductLike} from 'components';
import {HeartSolidLike} from 'svg/common';

import styles from './productStyles';
import picture from 'assets/images/signInBg.png';

const ProductItemGrid = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      style={[styles.itemGridWrapper, {marginLeft: index % 3 === 0 ? 12 : 4}]}
      onPress={() => {
        navigation.navigate('ProductDetail', {id: item.id});
      }}>
      <Image
        style={styles.imageGridStyle}
        source={
          item && item?.imageUrls?.length ? {uri: item?.imageUrls[0]} : picture
        }
        resizeMode="cover"
      />
      <View style={styles.toolGridContainer}>
        <ProductLike
          item={item}
          notLikeIcon={<HeartSolidLike />}
          likeIcon={<HeartSolidLike fill={'#EA3F49'} />}
        />
      </View>
    </TouchableOpacity>
  );
};
export default ProductItemGrid;
