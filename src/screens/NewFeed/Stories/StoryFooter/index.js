import React from 'react';
import {isEmpty} from 'lodash';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {HeartSolid, ChatSolid, ArrowSolid} from 'svg/common';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';
import {Image} from 'components';

import {HeartStroke} from 'svg/social';

import {TYPE_STORE, TYPE_USER} from 'constants';

import {currencyFormat} from 'utils/currency';

const HEIGHT_IMG = 64;
const WIDTH_IMG = 48;
const WIDTH = Dimensions.get('window').width;
const Footer = ({openChatModal, story, targetType}) => {
  const product = story?.product || {};
  const store = story?.store || {};
  return (
    <>
      <View style={styles.storyAction}>
        <TouchableOpacity style={styles.touch}>
          <ArrowSolid />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={openChatModal} style={styles.touch}>
          <ChatSolid />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.touch}>
          <HeartSolid />
        </TouchableOpacity>
      </View>
      {targetType === TYPE_STORE && !isEmpty(product) && (
        <View style={styles.productContainer}>
          <View style={styles.imageWrap}>
            <Image
              source={
                product?.imageUrls?.length
                  ? {uri: product.imageUrls[0]}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={{height: HEIGHT_IMG, width: WIDTH_IMG}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.productInfo}>
            <Text numberOfLines={1} style={styles.name}>
              {product.name}
            </Text>
            <Text style={styles.salePrice}>
              {currencyFormat(product.priceSale, 'đ')}
            </Text>
            <Text style={styles.price}>
              1{currencyFormat(product.price, 'đ')}
            </Text>
          </View>
          <TouchableOpacity style={styles.viewLike}>
            <HeartStroke />
          </TouchableOpacity>
        </View>
      )}
      {/* {targetType === TYPE_USER && (
        <View style={styles.storeContainer}>
          <View style={styles.storeContent}>
            <Text>Diesel Clothing Store</Text>
          </View>
          <View style={styles.contentRight} />
        </View>
      )} */}
    </>
  );
};
const styles = EStyleSheet.create({
  storyAction: {
    ...absolute(null, 50, null, 16),
    width: 44,
    paddingRight: 8,
    paddingLeft: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  touch: {
    paddingVertical: 12,
    marginLeft: 3,
  },
  line: {
    width: 20,
    height: 1,
    marginLeft: 3,
    backgroundColor: '$lightGray',
  },
  productContainer: {
    height: 76,
    width: WIDTH * 0.75,
    backgroundColor: '$white',
    borderRadius: 4,
    ...absolute(null, 50, 16, null),
    flexDirection: 'row',
  },
  imageWrap: {
    padding: 6,
  },
  productInfo: {
    paddingLeft: 8,
  },
  name: {
    fontFamily: '$font1',
    height: 28,
    marginTop: 6,
    width: WIDTH * 0.45,
  },
  salePrice: {
    fontFamily: '$font1Bold',
    fontSize: 15,
  },
  price: {
    fontFamily: '$font1',
    fontSize: 11,
    color: '$lightGray',
  },
  viewLike: {
    ...absolute(null, 0, null, 0),
    padding: 6,
  },
  storeContainer: {
    ...absolute(null, 50, 16, 0),
  },
  storeContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 30,
  },
  contentRight: {
    width: 20,
  },
});

export default Footer;
