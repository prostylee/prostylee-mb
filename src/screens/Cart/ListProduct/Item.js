/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';

const CategoriesRightItem = ({item, navigation}) => {
  const clickItem = () => {
    console.log('Cliked!');
  };
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity onPress={clickItem}>
        <View style={styles.item}>
          <Image
            source={
              item?.productImage
                ? {uri: item?.productImage}
                : require('assets/images/default.png')
            }
            resizeMode="cover"
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{height: 32}}>
            <Text numberOfLines={2} style={styles.title}>
              {item?.productName}
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
