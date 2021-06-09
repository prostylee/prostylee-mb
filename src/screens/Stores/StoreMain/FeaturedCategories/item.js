/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {categoriesActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
const FeaturedCategoriesItem = ({item, index, navigation}) => {
  const paddingLeft = index % 2 ? 4 : 12;
  const paddingRight = index % 2 ? 12 : 0;
  const dispatch = useDispatch();
  const clickItem = () => {
    dispatch(categoriesActions.setCategoriesParentSelect(item));
    dispatch(
      categoriesActions.getListRightCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        parentId: item?.id,
      }),
    );
    navigation.navigate('Categories');
  };
  return (
    <View
      style={[
        styles.wrapItems,
        {paddingLeft: paddingLeft, paddingRight: paddingRight},
      ]}>
      <TouchableOpacity style={styles.item} onPress={clickItem}>
        <Image
          source={
            item?.banner
              ? {uri: item?.banner}
              : require('assets/images/default.png')
          }
          resizeMode="cover"
          style={styles.imageThumbnail}
          PlaceholderContent={<ActivityIndicator />}
        />

        <Text numberOfLines={2} style={styles.titleCategory}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
