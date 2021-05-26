/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {Image} from 'components';
import {currencyFormat} from 'utils/currency';

const ProductItem = ({item}) => {
  return (
    <View style={styles.wrapItems} key={item.id}>
      <View style={styles.productItem}>
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
          <Text numberOfLines={2} style={styles.name}>
            {item.productName}
          </Text>
          {item?.price ? (
            <Text numberOfLines={1} style={styles.price}>
              {currencyFormat(item?.productPrice, 'đ')}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={styles.name}>
            Size: {item.productSize}&nbsp;{' '}
            <Text numberOfLines={1} style={styles.textSpace}>
              |
            </Text>
            &nbsp;{item.productColor}
          </Text>
        </View>
        <View>
          <Text numberOfLines={2} style={styles.count}>
            x{item.amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
