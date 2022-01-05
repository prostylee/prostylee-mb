/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {categoriesActions} from 'redux/reducers';
import {getListLeftCategoriesSelector} from 'redux/selectors/categories';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
const FeaturedCategoriesItem = ({item, index, navigation}) => {
  const dispatch = useDispatch();
  const listLeftCategoriesSelector = useSelector((state) =>
    getListLeftCategoriesSelector(state),
  );
  const listLeftCategories = listLeftCategoriesSelector?.content || [];

  const clickItem = () => {
    const parentCategory = listLeftCategories?.find(
      (parentItem) => parentItem.id === item?.parentId,
    );
    dispatch(categoriesActions.setCategoriesSelect(item));
    dispatch(categoriesActions.setCategoriesParentSelect(parentCategory));
    dispatch(
      categoriesActions.getListRightCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        parentId: item?.parentId,
      }),
    );
    navigation.navigate('Products');
  };
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity style={styles.item} onPress={clickItem}>
        <Image
          source={
            item?.icon
              ? {uri: item?.icon}
              : item?.banner
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
