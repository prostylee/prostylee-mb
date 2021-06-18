/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import styles from './styles';

import {useDispatch, useSelector} from 'react-redux';

import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {Colors} from 'components';
import {searchActions} from 'redux/reducers';
const FeaturedCategoriesItem = ({
  item,
  index,
  isActive = true,
  setActive = () => {},
  onItemPress = () => {},
}) => {
  const clickItem = (itemId) => {
    onItemPress('category', itemId);
    setActive(itemId);
  };

  return (
    <View
      style={[
        styles.wrapItems,
        {
          marginLeft: index === 0 ? 12 : 0,
          marginRight: 12,
        },
      ]}>
      <TouchableOpacity onPress={() => clickItem(item?.id)}>
        <View style={styles.item}>
          <View
            style={[
              styles.categoryButton,
              {
                borderWidth: isActive ? 1 : 0,
              },
            ]}>
            <Image
              source={{
                uri: item?.icon,
              }}
              style={{
                width: 24,
                height: 24,
                tintColor: isActive ? Colors['$purple'] : Colors['$lightGray'],
              }}
            />
          </View>
          <Text
            numberOfLines={2}
            style={[
              styles.titleCategory,
              {
                color: isActive ? Colors['$purple'] : Colors['$black'],
              },
            ]}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
