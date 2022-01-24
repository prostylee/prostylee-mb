import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
const Item = ({item, onPress, parentName}) => {
  console.log('firstitem', item);
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image
        source={
          item?.icon
            ? {uri: decodeURI(item?.icon)}
            : require('assets/images/default.png')
        }
        style={styles.categoryIcon}
      />
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
