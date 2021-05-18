/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {Heart, HeartFill} from 'svg/common';
import {currencyFormat} from 'utils/currency';
import {
  likeProductService,
  unLikeProductService,
} from 'services/api/productApi';
import * as CONTANTS from 'constants';

const ProductItem = ({item}) => {
  const [clickLike, handdleClickLike] = useState(false);
  const [productLike, handdleProductLike] = useState(
    item?.productLike ? item?.productLike : false,
  );
  const toggleProduct = async () => {
    if (clickLike) {
      return null;
    } else {
      handdleClickLike(true);
      let result = null;
      if (productLike) {
        result = await unLikeProductService(item.id);
      } else {
        result = await likeProductService(item.id);
      }
      if (result.ok && result.data.status === CONTANTS.SUCCESS) {
        handdleProductLike(!productLike);
      }
      handdleClickLike(false);
      console.log(result);
    }
  };
  return (
    <View style={styles.wrapItems}>
      <View style={styles.item}>
        <View style={styles.wrapImageThumbnail}>
          <Image
            source={
              item?.imageUrls.length
                ? {uri: item?.imageUrls[0]}
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
          <TouchableOpacity onPress={toggleProduct}>
            {!productLike ? <Heart /> : <HeartFill />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
