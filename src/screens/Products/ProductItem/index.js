/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {Heart} from 'svg/common';
import {currencyFormat} from 'utils/currency';
import {IMG_RATIO} from 'constants';

const ProductItem = ({item}) => {
  console.log(item);
  return (
    <View style={styles.wrapItems}>
      <View style={styles.item}>
        <View style={styles.wrapImageThumbnail}>
          <Image
            source={
              item?.productOwnerResponse.logoUrl
                ? {uri: item?.productOwnerResponse.logoUrl}
                : require('assets/images/default.png')
            }
            resizeMode="cover"
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
          {item?.priceSale < item?.price ? (
            <View style={styles.wrapTextSale}>
              <Text style={styles.textSale}>
                {' '}
                -{Math.round(100 - (item?.priceSale / item?.price) * 100)}%{' '}
              </Text>
            </View>
          ) : null}
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.price}>
          {currencyFormat(item?.priceSale, 'đ')}
        </Text>
        <View style={styles.wrapPriceRoot}>
          <Text numberOfLines={1} style={styles.priceRoot}>
            {currencyFormat(item?.price, 'đ')}
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
