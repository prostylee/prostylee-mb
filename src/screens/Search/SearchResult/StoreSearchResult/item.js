/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {categoriesActions, productActions} from 'redux/reducers';
const FeaturedCategoriesItem = ({item, index, navigation}) => {
  const paddingLeft = index % 2 ? 4 : 12;
  const paddingRight = index % 2 ? 12 : 0;
  console.log(paddingLeft)
  const dispatch = useDispatch();
  const clickItem = () => {
    dispatch(categoriesActions.setCategoriesSelect(item));
    navigation.navigate('Products');
  };
  return (
    <View style={[styles.wrapItems, { paddingLeft: paddingLeft, paddingRight:paddingRight }]}>
      <TouchableOpacity onPress={clickItem}>
        <View style={styles.item}>
          <Text numberOfLines={2} style={styles.titleCategory}>
            Thời trang nam{item?.name}
          </Text>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
