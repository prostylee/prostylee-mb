/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {categoriesActions} from 'redux/reducers';
const CategoriesRightItem = ({item, navigation}) => {
  const dispatch = useDispatch();
  const clickItem = () => {
    dispatch(categoriesActions.setCategoriesSelect(item));
    navigation.navigate('Products');
  };
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity onPress={clickItem}>
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
          <Text numberOfLines={2} style={styles.title}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

CategoriesRightItem.defaultProps = {};

CategoriesRightItem.propTypes = {};

export default CategoriesRightItem;
