import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {Divider} from 'react-native-paper';
const Item = ({item, index, onItemPress = () => {}}) => {
  return (
    <>
      <TouchableOpacity style={styles.itemContainer} onPress={onItemPress}>
        <Image
          source={
            item?.icon
              ? {uri: item?.icon}
              : require('assets/images/default.png')
          }
          style={styles.categoryIcon}
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      <Divider />
    </>
  );
};
export default Item;
