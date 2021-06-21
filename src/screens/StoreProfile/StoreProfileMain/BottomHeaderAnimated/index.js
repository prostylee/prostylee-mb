import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import styles from './styles';

import {ThemeView, SortDropDown} from 'components';
import FilterBar from './FilterBar';
import {PRODUCT_SORT_ITEM} from 'constants';

const BottomHeaderAnimated = ({navigation, onSort = () => {}}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [activeItemLabel, setActiveItemLabel] = useState('');
  const [valueSort, setValueSort] = useState(null);

  const _handleSort = (value) => {
    setValueSort(value);
    onSort(value);
    let label = PRODUCT_SORT_ITEM.find((v) => v.value === value).label;
    setActiveItemLabel(label);
  };
  return (
    <View style={styles.container}>
      <FilterBar
        setVisible={setVisible}
        visible={visible}
        activeSortItem={activeItemLabel}
        navigation={navigation}
      />
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setValueSort={_handleSort}
        valueSort={valueSort}
        options={PRODUCT_SORT_ITEM}
      />
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
