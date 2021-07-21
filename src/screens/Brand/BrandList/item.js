/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {brandActions} from 'redux/reducers';
const BrandItem = ({item, isActive = false}) => {
  const dispatch = useDispatch();
  const clickItem = () => {
    dispatch(brandActions.setSelectedBrand(item));
  };
  return (
    <View style={[styles.wrapItems, isActive ? styles.activeItem : null]}>
      <TouchableOpacity onPress={clickItem}>
        <View style={styles.item}>
          <Image
            source={
              item?.icon
                ? {uri: item?.icon}
                : require('assets/images/default.png')
            }
            resizeMode="cover"
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{height: 32}}>
            <Text numberOfLines={2} style={styles.title}>
              {item?.name || 'Nike'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

BrandItem.defaultProps = {};

BrandItem.propTypes = {};

export default BrandItem;
