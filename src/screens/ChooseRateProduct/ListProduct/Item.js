/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {Image} from 'components';
import {currencyFormat} from 'utils/currency';

const ProductItem = ({item, navigation}) => {

  const onNavigate=()=>{
    navigation.navigate('RateProduct', {
      product: item,
    });
  }

  return (
    <TouchableOpacity
      style={styles.wrapItems}
      key={item.id}
      onPress={onNavigate}>
      <View style={styles.productItem}>
        <View style={styles.wrapImageThumbnail}>
          <Image
            source={
              item.image
                ? {uri: item?.image}
                : require('assets/images/default.png')
            }
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.wrapTextContent}>
          <Text numberOfLines={2} style={styles.name}>
            {item.name}
          </Text>
          {item?.price ? (
            <Text numberOfLines={1} style={styles.price}>
              {currencyFormat(item?.price, 'đ')}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={styles.name}>
            Size: {item.size}&nbsp;{' '}
            <Text numberOfLines={1} style={styles.textSpace}>
              |
            </Text>
            &nbsp;{item.color}
          </Text>
        </View>
        <View>
          <Text numberOfLines={2} style={styles.count}>
            x{item.count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
