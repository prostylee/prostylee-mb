/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {Heart} from 'svg/common';

const ProductItem = ({item}) => {
  return (
    <View style={styles.wrapItems}>
      <View style={styles.item}>
        <View style={styles.wrapImageThumbnail}>
          <Image style={styles.imageThumbnail} source={{uri: item.src}} />
          <View style={styles.wrapTextSale}>
            <Text style={styles.textSale}> -50% </Text>
          </View>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {item.id % 2 == 0
            ? 'Giày adidas Original Continental 80’s'
            : 'Áo thun'}
        </Text>
        <Text numberOfLines={1} style={styles.price}>
          700.000đ
        </Text>
        <View style={styles.wrapPriceRoot}>
          <Text numberOfLines={1} style={styles.priceRoot}>
            1.000.000đ
          </Text>
          <Heart />
        </View>
      </View>
    </View>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
