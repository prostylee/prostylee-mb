import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
const Item = ({item, onPress, parentName}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Text style={styles.itemText}>
        {parentName} / {item.name}
      </Text>
    </TouchableOpacity>
  );
};
Item.defaultProps = {
  item: {},
  onPress: () => {},
  parentName: '',
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  parentName: PropTypes.string.isRequired,
};
export default Item;
