/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {categoriesActions, productActions} from 'redux/reducers';
const FeaturedCategoriesItem = ({item, index, navigation}) => {
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity>
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
          <View style={styles.wrapDetail}>
            <View style={styles.wrapTitle}>
              <Text numberOfLines={1} style={styles.titleCategory}>
                Thời trang nam Thời trang nam Thời trang nam Thời trang nam
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
