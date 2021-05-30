/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import HeaderStore from './HeaderStore';
import {currencyFormat} from 'utils/currency';
import {DownArrow} from 'svg/common';

const Item = ({product, navigation}) => {
  const [visible, setVisible] = useState(false);

  const {storeId, storeName, storeAvatar, data} = product;

  useEffect(() => {}, [JSON.stringify(data)]);

  return (
    <>
      <View style={styles.wrapSection}>
        <HeaderStore header={{storeId, storeName, storeAvatar}} />
        {data.map((item, index) => (
          <View style={styles.wrapItems} key={`${item.id}-${index}`}>
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
                      {currencyFormat(item?.productPrice, 'đ')}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.wrapAttribute}>
                  <Text numberOfLines={1} style={styles.name}>
                    Size: {item.productSize}&nbsp;{' '}
                    <Text numberOfLines={1} style={styles.textSpace}>
                      |
                    </Text>
                    &nbsp;{item.productColor}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapAmount}>
                <Text numberOfLines={2} style={styles.count}>
                  x{item.amount}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

Item.defaultProps = {};

Item.propTypes = {};

export default Item;
