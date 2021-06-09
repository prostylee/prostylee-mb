import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {getProductFilterState} from 'redux/selectors/search/productFilter';

const FeaturedCategoriesItem = ({item, index, navigation}) => {
  const paddingLeft = index % 2 ? 4 : 12;
  const paddingRight = index % 2 ? 12 : 0;
  const dispatch = useDispatch();
  const filterState = useSelector((state) => getProductFilterState(state));
  const clickItem = (item) => {
    dispatch(
      searchActions.setProductFilterState({
        ...filterState,
        category: item,
      }),
    );
    dispatch(
      searchActions.getProductsSearch({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        categoryId: item,
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
      <TouchableOpacity onPress={() => clickItem(item?.id)}>
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
