import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image, ProductLike} from 'components';
import {currencyFormat, priceSalePercent} from 'utils/currency';

const ProductItem = ({item, index}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.wrapItems,
        {
          paddingLeft: index % 2 === 0 ? 16 : 6,
          paddingRight: index % 2 === 1 ? 16 : 6,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          console.log('NAVIGATION ID', item?.id);
          navigation.navigate('ProductDetail', {id: item.id});
        }}>
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
          <View style={styles.informationWrapper}>
            <Text numberOfLines={2} style={styles.title}>
              {item.name}
            </Text>
            <View>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
