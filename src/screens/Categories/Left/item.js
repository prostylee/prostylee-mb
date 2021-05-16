/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import PropTypes from 'prop-types';
const CategoriesLeftItem = ({item, active = false}) => {
  return (
    <View style={styles.wrapItems}>
      <View style={[styles.item, active ? styles.itemActive : null]}>
        <Image style={styles.imageThumbnail} source={{uri: item.icon}} />
        <View style={{height: 32}}>
          <Text numberOfLines={2} style={styles.title}>
            {item.name}
          </Text>
        </View>
      </View>
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
