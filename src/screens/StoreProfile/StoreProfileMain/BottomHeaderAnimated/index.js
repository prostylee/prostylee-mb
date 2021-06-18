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

const SearchProducts = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <FilterBar
        setVisible={setVisible}
        visible={visible}
        activeSortItem={valueSort?.label ? valueSort?.label : ''}
        navigation={navigation}
      />
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={setValueSort}
        valueSort={valueSort}
        options={PRODUCT_SORT_ITEM}
      />
    </View>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
