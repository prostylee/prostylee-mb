/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Image, ProductLike} from 'components';
import styles from './styles';
import {currencyFormat, priceSalePercent} from 'utils/currency';

const ProductItem = ({item}) => {
  console.log(item);
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
                -{priceSalePercent(item?.price, item?.priceSale)}%
              </Text>
            </View>
          ) : null}
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {item.name}
        </Text>
        {item?.priceSale ? (
          <Text numberOfLines={1} style={styles.price}>
            {currencyFormat(item?.priceSale, 'đ')}
          </Text>
        ) : null}

        <View style={styles.wrapPriceRoot}>
          {item?.price ? (
            <Text numberOfLines={1} style={styles.priceRoot}>
              {currencyFormat(item?.price, 'đ')}
            </Text>
          ) : null}

          <ProductLike item={item} />
        </View>
      </View>
    </View>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
