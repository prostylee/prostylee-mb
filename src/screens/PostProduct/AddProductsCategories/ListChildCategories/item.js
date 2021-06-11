import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
const Item = ({item, index, onPress, parentName = ''}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Text style={styles.itemText}>
        {parentName} / {item.name}
      </Text>
    </TouchableOpacity>
  );
};
export default Item;
