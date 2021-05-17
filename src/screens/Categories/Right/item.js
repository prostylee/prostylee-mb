/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {categoriesActions} from 'redux/reducers';
const CategoriesRightItem = ({item, navigation}) => {
  const dispatch = useDispatch();
  const clickItem = () => {
    dispatch(categoriesActions.setCategoriesSelect(item));
    navigation.navigate('Products');
    // dispatch(
    //   categoriesActions.getListRightCategories({
    //     page: PAGE_DEFAULT,
    //     limit: LIMIT_DEFAULT,
    //     parentId: item?.id,
    //   }),
    // );
  };
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity onPress={clickItem}>
        <View style={styles.item}>
          <Image style={styles.imageThumbnail} source={{uri: item?.icon}} />
          <View style={{height: 32}}>
            <Text numberOfLines={2} style={styles.title}>
              {item?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

CategoriesRightItem.defaultProps = {};

CategoriesRightItem.propTypes = {};

export default CategoriesRightItem;
