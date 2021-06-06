/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useState} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import HeaderStore from '../HeaderStore';
import {currencyFormat} from 'utils/currency';
import {DownArrow} from 'svg/common';
import {useNavigation} from '@react-navigation/native';

const Item = ({product, status, changeCount, onChangeCount, children}) => {
  const navigation = useNavigation();

  const {storeId, storeName, storeAvatar, data} = product;

  const onViewDetail = () => {
    navigation.navigate('OrdersDetail', {
      dealId: null,
      deal: {},
      status: status,
    });
  };

  const renderBody = () => (
    <>
      <HeaderStore header={{storeId, storeName, storeAvatar}} status={status} />
      {data.map((item, index) => (
        <View style={styles.productItem} key={item.id}>
          <View style={styles.wrapImageThumbnail}>
            <Image
              source={
                item?.imageUrls.length
                  ? {uri: item?.imageUrls[0]}
                  : require('assets/images/default.png')
              }
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          {changeCount ? (
            <View style={styles.wrapTextContent}>
              <View style={styles.wrapInfo}>
                <Text numberOfLines={2} style={styles.name}>
                  {item.name}
                </Text>
                {item?.price ? (
                  <Text numberOfLines={1} style={styles.price}>
                    {currencyFormat(item?.price, 'đ')}
                  </Text>
                ) : null}
              </View>
              <View style={styles.wrapUpDown}>
                <View style={{...styles.wrapAttribute, flex: 1}}>
                  <Text numberOfLines={1} style={styles.name}>
                    Size: {item.productSize}&nbsp;
                    <Text numberOfLines={1} style={styles.textSpace}>
                      |
                    </Text>
                    &nbsp;{item.productColor}
                  </Text>
                </View>
                <View style={styles.wrapAmount}>
                  <NumberInputUpDown
                    value={item.count}
                    onChange={onChangeCount}
                  />
                </View>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.wrapTextContent}>
                <View style={styles.wrapInfo}>
                  <Text numberOfLines={2} style={styles.name}>
                    {item.name}
                  </Text>
                  {item?.price ? (
                    <Text numberOfLines={1} style={styles.price}>
                      {currencyFormat(item?.price, 'đ')}
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
            </>
          )}
        </View>
      ))}
      {children}
    </>
  );
  return status === 'inhouse' ? (
    <View style={styles.wrapSection}>{renderBody()}</View>
  ) : (
    <TouchableOpacity style={styles.wrapSection} onPress={onViewDetail}>
      {renderBody()}
    </TouchableOpacity>
  );
};

Item.defaultProps = {
  changeCount: false,
};

Item.propTypes = {};

export default Item;
