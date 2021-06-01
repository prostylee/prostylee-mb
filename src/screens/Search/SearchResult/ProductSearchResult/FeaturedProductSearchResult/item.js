/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image, ProductLike, AirbnbRating} from 'components';
import styles from './styles';
import {currencyFormat, priceSalePercent} from 'utils/currency';

const FeaturedCategoriesItem = ({item, index, navigation}) => {
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity>
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
            <View style={styles.wrapTextSale}>
              <Text style={styles.textSale}>
                -{priceSalePercent(100000, 90000)}%
              </Text>
            </View>
          </View>

          <View style={styles.wrapDetail}>
            <View style={styles.wrapTitle}>
              <Text numberOfLines={1} style={styles.title}>
                {item?.name}
              </Text>
              <ProductLike item={item} />
            </View>

            <Text numberOfLines={1} style={styles.price}>
              {currencyFormat(item?.priceSale, 'đ')}
            </Text>
            <Text numberOfLines={1} style={styles.priceRoot}>
              {currencyFormat(item?.price, 'đ')}
            </Text>
            <View style={styles.wrapRating}>
              <AirbnbRating
                showRating={false}
                isDisabled={true}
                size={12}
                count={5}
                defaultRating={3}
              />
              <Text numberOfLines={1} style={styles.resultRating}>
                4.6(2)
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
