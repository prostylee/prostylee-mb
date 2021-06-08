/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {categoriesActions, productActions} from 'redux/reducers';
import {Divider} from 'react-native-paper';
const StoreSearchResultItem = ({item, index, navigation}) => {
  const dispatch = useDispatch();
  const clickItem = () => {
    navigation.navigate('ProductDetail', {id: item.id});
  };
  return (
    <View style={[styles.wrapItems]}>
      <TouchableOpacity onPress={clickItem}>
        <View style={styles.item}>
          <Image
            source={
              item?.imageUrl
                ? {uri: item?.imageUrl}
                : require('assets/images/signInBg.png')
            }
            resizeMode="cover"
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text numberOfLines={2} style={styles.titleProduct}>
            {item?.name}
          </Text>
          <Divider />
        </View>
      </TouchableOpacity>
    </View>
  );
};

StoreSearchResultItem.defaultProps = {};

StoreSearchResultItem.propTypes = {};

export default StoreSearchResultItem;
