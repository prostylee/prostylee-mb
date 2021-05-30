/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {Image, ButtonRounded} from 'components';
import CardVoucher from '../CardVoucher';
import {Button} from 'react-native-paper';

const ProductItem = ({item, navigation}) => {
  return (
    <CardVoucher style={styles.cardItem}>
      <View style={styles.wrapCardItem}>
        <View style={styles.wrapContentVoucher}>
          <View>
            <Image
              source={
                item?.logoImage
                  ? {uri: item?.logoImage}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.wrapInfo}>
            <Text numberOfLines={1} style={styles.textCategory}>
              {item.category}
            </Text>
            <Text numberOfLines={2} style={styles.textDescription}>
              {item.description}
            </Text>
          </View>
        </View>
        <View style={styles.dashedLine}></View>
        <View style={styles.wrapExpiredVoucher}>
          <View style={styles.wrapExpiredText}>
            <Text
              numberOfLines={1}
              style={styles.textExpired}>{`HSD: ${item.expired}`}</Text>
          </View>
          <View>
            <Button
              contentStyle={styles.button}
              labelStyle={styles.labelStyle}
              mode="contained"
              color="#823FFD">
              Sử dụng
            </Button>
          </View>
        </View>
      </View>
    </CardVoucher>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
