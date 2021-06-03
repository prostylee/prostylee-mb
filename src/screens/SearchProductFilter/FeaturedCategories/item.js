/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
// import {Image} from 'components';
import styles from './styles';

import {useDispatch, useSelector} from 'react-redux';
import {categoriesActions, productActions} from 'redux/reducers';
import {MenFashion, WomanFashion} from 'svg/categories';
import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {Colors} from 'components';
import {searchActions} from 'redux/reducers';
const FeaturedCategoriesItem = ({
  item,
  index,
  navigation,
  isActive = true,
  setActive = () => {},
}) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;
  const clickItem = (itemId) => {
    // let newCategoryState = null;
    // if (categoryFilterState && categoryFilterState.length) {
    //   let flag = categoryFilterState?.indexOf(itemId);
    //   if (flag < 0) {
    //     newCategoryState = [...categoryFilterState, itemId];
    //   } else {
    //     newCategoryState = [...categoryFilterState];
    //     newCategoryState.splice(flag, 1);
    //   }
    // } else {
    //   newCategoryState = [itemId];
    // }

    dispatch(
      searchActions.setProductFilterState({
        ...filterState,
        category: itemId,
      }),
    );
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
