/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {categoriesActions, productActions} from 'redux/reducers';
import {MenFashion, WomanFashion} from '../../../../../svg/categories';
import {Colors} from 'components';
const FeaturedCategoriesItem = ({
  item,
  index,
  navigation,
  isActive = true,
  setActive = () => {},
}) => {
  const dispatch = useDispatch();
  const clickItem = () => {
    // dispatch(categoriesActions.setCategoriesSelect(item));

    // navigation.navigate('Products');
    setActive(index);
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
      <TouchableOpacity onPress={clickItem}>
        <View style={styles.item}>
          <View
            style={[
              styles.categoryButton,
              {
                borderWidth: isActive ? 1 : 0,
              },
            ]}>
            <WomanFashion
              color={isActive ? Colors['$purple'] : Colors['$lightGray']}
              width={24}
              height={24}
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
            Thời trang nam{item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
