/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import HeaderStore from './HeaderStore';
import {currencyFormat} from 'utils/currency';

const Item = ({product, navigation}) => {
  const clickItem = () => {
    console.log('Cliked!');
  };

  const {storeId, storeName, storeAvatar, data} = product;

  return (
    <View style={styles.wrapSection}>
      <HeaderStore header={{storeId, storeName, storeAvatar}} />
      {data.map((item, index) => (
        <View style={styles.wrapItems} key={item.id}>
          <View style={styles.productItem}>
            <View style={styles.wrapImageThumbnail}>
              <Image
                source={
                  item.productImage
                    ? {uri: item?.productImage}
                    : require('assets/images/default.png')
                }
                style={styles.productAvatar}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={styles.wrapTextContent}>
              <View>
                <Text numberOfLines={2} style={styles.name}>
                  {item.productName}
                </Text>
                {item?.productPrice ? (
                  <Text numberOfLines={1} style={styles.price}>
                    {currencyFormat(item?.productPrice, 'đ')}
                  </Text>
                ) : null}
              </View>
              <View style={styles.wrapAmount}>
                <View style={styles.wrapSize}>
                  <Text numberOfLines={1} style={styles.name}>
                    Size: {item.productSize}&nbsp;{' '}
                    <Text numberOfLines={1} style={styles.textSpace}>
                      |
                    </Text>
                    &nbsp;{item.productColor}
                  </Text>
                </View>
                <View style={styles.wrapUpdown}>
                  <NumberInputUpDown value={+item.amount} />
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

Item.defaultProps = {};

Item.propTypes = {};

export default Item;
