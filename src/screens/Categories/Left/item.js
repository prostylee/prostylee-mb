/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesParentSelectSelector} from 'redux/selectors/categories';
import {categoriesActions} from 'redux/reducers';
import {IMG_RATIO, LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const CategoriesLeftItem = ({item, setBanner}) => {
  if (item && item.id === undefined) {
    return null;
  }
  const dispatch = useDispatch();
  const categoryParentSelect = useSelector((state) =>
    getCategoriesParentSelectSelector(state),
  );
  const active = categoryParentSelect
    ? categoryParentSelect.id === item.id
    : false;

  const clickItem = () => {
    setBanner(item.banner);
    dispatch(categoriesActions.setCategoriesParentSelect(item));
    dispatch(
      categoriesActions.getListRightCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        parentId: item?.id,
      }),
    );
  };

  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity onPress={clickItem}>
        <View style={[styles.item, active ? styles.itemActive : null]}>
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

CategoriesLeftItem.defaultProps = {
  item: {},
};

CategoriesLeftItem.propTypes = {
  item: PropTypes.object,
};

export default CategoriesLeftItem;
