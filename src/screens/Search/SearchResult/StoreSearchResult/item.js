import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import styles from './styles';
const StoreSearchResultItem = ({item, index, navigation}) => {
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
                : require('assets/images/default.png')
            }
            resizeMode="cover"
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text numberOfLines={2} style={styles.titleProduct}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

StoreSearchResultItem.defaultProps = {};

StoreSearchResultItem.propTypes = {};

export default StoreSearchResultItem;
