import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image, ProductLike} from 'components';
import styles from './styles';
import {currencyFormat, priceSalePercent} from 'utils/currency';
import {CURRENCY_VIET_NAM, USER_POST_TYPE_PRODUCT} from 'constants';

const ProductItem = ({item}) => {
  const navigation = useNavigation();
  let productInfo;
  if (item?.targetType && item?.targetType == USER_POST_TYPE_PRODUCT) {
    productInfo = item?.product;
  } else {
    productInfo = item;
  }
  const isSale = Number(productInfo.priceSale) > 0;
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail', {id: productInfo.id});
        }}>
        <View style={styles.item}>
          <View style={styles.wrapImageThumbnail}>
            <Image
              source={
                productInfo?.imageUrls?.length
                  ? {uri: productInfo?.imageUrls[0]}
                  : productInfo?.imageUrl
                  ? {uri: productInfo?.imageUrl}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
            {isSale && productInfo?.priceSale < productInfo?.price ? (
              <View style={styles.wrapTextSale}>
                <Text style={styles.textSale}>
                  -
                  {priceSalePercent(productInfo?.price, productInfo?.priceSale)}
                  %
                </Text>
              </View>
            ) : null}
          </View>
          <Text numberOfLines={2} style={styles.title}>
            {productInfo.name}
          </Text>

          <View style={styles.priceInfoContainer}>
            <View style={styles.priceContainer}>
              {isSale && productInfo?.priceSale ? (
                <Text numberOfLines={1} style={styles.price}>
                  {currencyFormat(productInfo?.priceSale, '')}
                  <Text style={[styles.price, styles.currencyBlack]}>
                    {CURRENCY_VIET_NAM}
                  </Text>
                </Text>
              ) : null}
              {productInfo?.price ? (
                <Text
                  numberOfLines={1}
                  style={
                    isSale && productInfo?.priceSale
                      ? styles.priceRoot
                      : styles.price
                  }>
                  {currencyFormat(
                    productInfo?.price,
                    isSale && productInfo?.priceSale ? CURRENCY_VIET_NAM : '',
                  )}
                  {isSale && productInfo?.priceSale ? null : (
                    <Text
                      style={[
                        isSale && productInfo?.priceSale
                          ? styles.priceRoot
                          : styles.price,
                        styles.currencyBlack,
                      ]}>
                      {CURRENCY_VIET_NAM}
                    </Text>
                  )}
                </Text>
              ) : null}
            </View>
            <ProductLike item={productInfo} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
