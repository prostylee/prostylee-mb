/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import HeaderStore from './HeaderStore';
import {currencyFormat} from 'utils/currency';

const Item = ({product, navigation}) => {
  const {storeId, storeName, storeAvatar, data, amount, options} = product;

  useEffect(() => {}, [JSON.stringify(data)]);

  return (
    <>
      <View style={styles.wrapSection}>
        <HeaderStore header={{storeId, storeName, storeAvatar}} />
        {data.map((item, index) => (
          <View style={styles.productItem} key={item.id}>
            <View style={styles.wrapImageThumbnail}>
              <Image
                source={
                  item?.imageUrls?.length
                    ? {uri: item?.imageUrls[0]}
                    : require('assets/images/default.png')
                }
                style={styles.imageThumbnail}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={styles.wrapTextContent}>
              <View style={styles.wrapInfo}>
                <Text numberOfLines={2} style={styles.name}>
                  {item.name}
                </Text>
                {item?.priceSale ? (
                  <Text numberOfLines={1} style={styles.price}>
                    {currencyFormat(item?.priceSale, 'đ')}
                  </Text>
                ) : null}
              </View>
              <View style={styles.wrapAttribute}>
                <Text numberOfLines={1} style={styles.name}>
                  {options.map((op) => {
                    return (
                      <>
                        <Text style={styles.name}>{`${op.label}:`}&nbsp;</Text>
                        <Text style={styles.addButtonText}>
                          &nbsp;{op.value.attrValue}&nbsp;
                        </Text>
                      </>
                    );
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.wrapAmount}>
              <Text numberOfLines={2} style={styles.count}>
                x{amount}
              </Text>
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
