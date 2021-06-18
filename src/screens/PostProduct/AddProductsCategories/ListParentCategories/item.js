import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import {Divider} from 'react-native-paper';
import PropTypes from 'prop-types';
const Item = ({item, onItemPress}) => {
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
Item.defaultProps = {
  item: {},
  onItemPress: () => {},
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onItemPress: PropTypes.func.isRequired,
};
export default Item;
