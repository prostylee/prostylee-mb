/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'components';
import styles from './styles';
import PropTypes from 'prop-types';
const CategoriesRightItem = ({item}) => {
  const active = item.id == 1;
  return (
    <View style={styles.wrapItems}>
      <View style={styles.item}>
        <Image style={styles.imageThumbnail} source={{uri: item.src}} />
        <View style={{height: 32}}>
          <Text numberOfLines={2} style={styles.title}>
            {item.id % 2 == 0 ? 'Sơ mi ngắn tay' : 'Áo thun'}
          </Text>
        </View>
      </View>
    </View>
  );
};

CategoriesRightItem.defaultProps = {
  item: {},
};

CategoriesRightItem.propTypes = {
  item: PropTypes.object,
};

export default CategoriesRightItem;
