import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {Image} from 'components';
import {currencyFormat} from 'utils/currency';
import {CURRENCY_VIET_NAM} from 'constants';

const ProductItem = ({item, navigation, onRateSuccess = () => {}}) => {
  const onNavigate = () => {
    navigation.navigate('RateProduct', {
      productId: item.id,
      product: item,
      onRateSuccess: onRateSuccess,
    });
  };
  const getAttributesText = () => {
    if (item?.orderDetailAttributes && item?.orderDetailAttributes?.length) {
      let attributeString = [...item?.orderDetailAttributes]?.reduce(
        (text, item, index) => {
          return index !== 0 ? text + '| ' + item?.value : text + item?.value;
        },
        '',
      );
      return attributeString;
    }
    return '';
  };

  return (
    <TouchableOpacity
      style={styles.wrapItems}
      key={item.id}
      onPress={onNavigate}>
      <View style={styles.productItem} key={item.id}>
        <View style={styles.wrapImageThumbnail}>
          <Image
            source={
              item.productImage
                ? {uri: item?.productImage}
                : require('assets/images/default.png')
            }
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.wrapTextContent}>
          <View style={styles.wrapInfo}>
            <Text numberOfLines={2} style={styles.name}>
              {item.productName}
            </Text>
            {item?.productPrice ? (
              <Text numberOfLines={1} style={styles.price}>
                {currencyFormat(item?.productPrice, CURRENCY_VIET_NAM)}
              </Text>
            ) : null}
          </View>
          <View style={styles.wrapAttribute}>
            <Text numberOfLines={1} style={styles.name}>
              {getAttributesText()}
            </Text>
          </View>
        </View>
        <View style={styles.wrapAmount}>
          <Text numberOfLines={2} style={styles.count}>
            x{item.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
