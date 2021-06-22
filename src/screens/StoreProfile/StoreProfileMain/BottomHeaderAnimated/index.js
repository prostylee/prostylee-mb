import React, {useState} from 'react';
import {View} from 'react-native';

import styles from './styles';

import {ThemeView, SortDropDown} from 'components';
import FilterBar from './FilterBar';
import {PRODUCT_SORT_ITEM} from 'constants';

const BottomHeaderAnimated = ({
  navigation,
  activeItemLabel = '',
  visible,
  setVisible,
}) => {
  return (
    <View style={styles.container}>
      <FilterBar
        setVisible={setVisible}
        visible={visible}
        activeSortItem={activeItemLabel}
        navigation={navigation}
      />
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
