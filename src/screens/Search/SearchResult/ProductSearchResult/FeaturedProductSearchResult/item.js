import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image, ProductLike, ProductRatingStar} from 'components';
import styles from './styles';
import {currencyFormat, priceSalePercent} from 'utils/currency';
import {CURRENCY_VIET_NAM} from 'constants';

const FeaturedCategoriesItem = ({item, navigation}) => {
  const onItemClick = () => {
    navigation.navigate('ProductDetail', {id: item.id});
  };
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity onPress={onItemClick}>
        <View style={styles.item}>
          <View style={styles.wrapImage}>
            <Image
              source={
                item?.imageUrls?.length
                  ? {uri: item?.imageUrls[0]}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
            {item.price === item.priceSale ? null : (
              <View style={styles.wrapTextSale}>
                <Text style={styles.textSale}>
                  -
                  {priceSalePercent(
                    item?.price ? item?.price : 0,
                    item?.priceSale ? item?.priceSale : 0,
                  )}
                  %
                </Text>
              </View>
            )}
          </View>

          <View style={styles.wrapDetail}>
            <View style={styles.wrapTitle}>
              <Text numberOfLines={1} style={[styles.title, styles.colorBlack]}>
                {item?.name}
              </Text>
              <ProductLike item={item} />
            </View>

            {item?.priceSale ? (
              <Text numberOfLines={1} style={styles.price}>
                {currencyFormat(item?.priceSale, CURRENCY_VIET_NAM)}
              </Text>
            ) : null}
            {item?.price ? (
              <Text numberOfLines={1} style={styles.priceRoot}>
                {currencyFormat(item?.price, CURRENCY_VIET_NAM)}
              </Text>
            ) : null}
            <View style={styles.wrapRating}>
              <ProductRatingStar
                value={item?.productStatisticResponse?.resultOfRating || 0}
              />
              <Text numberOfLines={1} style={styles.resultRating}>
                {item.productStatisticResponse
                  ? `${item?.productStatisticResponse?.resultOfRating || 0}(${
                      item?.productStatisticResponse?.numberOfLike || 0
                    })`
                  : '0(0)'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
