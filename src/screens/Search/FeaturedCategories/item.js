import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const FeaturedCategoriesItem = ({item, index, navigation}) => {
  const paddingLeft = index % 2 ? 4 : 12;
  const paddingRight = index % 2 ? 12 : 0;
  const dispatch = useDispatch();
  const clickItem = (item) => {
    dispatch(searchActions.setCurrentKeyword(item));
    dispatch(
      searchActions.getProductsSearch({
        keyword: item,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
      }),
    );
    dispatch(
      searchActions.getStoreSearch({
        keyword: item,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        numberOfProducts: 10,
      }),
    );
    dispatch(
      searchActions.getHintProductSearch({
        keyword: item,
        type: 'product',
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    navigation.navigate('SearchProducts');
  };
  return (
    <View
      style={[
        styles.wrapItems,
        {paddingLeft: paddingLeft, paddingRight: paddingRight},
      ]}>
      <TouchableOpacity onPress={() => clickItem(item?.name)}>
        <View style={styles.item}>
          <Text numberOfLines={2} style={styles.titleCategory}>
            {item?.name}
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
