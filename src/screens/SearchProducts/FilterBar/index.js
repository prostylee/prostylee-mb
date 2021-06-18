import React from 'react';
import i18n from 'i18n';
import {TouchableOpacity, View, Text} from 'react-native';
import {Sort, Filter, CaretDown} from 'svg/common';
import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {searchActions} from 'redux/reducers';
import styles from './styles';
import {useSelector} from 'react-redux';
import {Colors, FilterButton} from 'components';

const FilterBar = ({
  setVisible = () => {},
  visible = false,
  navigation,
  sortActiveItem = '',
}) => {
  return (
    <View style={styles.wrapBlockOne}>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <View style={styles.contentBlockOne}>
          <View>
            <Sort />
          </View>
          <Text numberOfLines={1} style={styles.textSort}>
            {i18n.t('sort')}:
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.textSort,
              {
                color: Colors['$black'],
              },
            ]}>
            {sortActiveItem}
          </Text>
          <View>
            <CaretDown />
          </View>
        </View>
      </TouchableOpacity>
      <FilterButton
        filterDispatchAction={searchActions.getProductsSearch}
        getFilterStateSelectorFunction={getProductFilterState}
        clearFilterStateAction={searchActions.clearProductsFilterState}
        setFilterStateAction={searchActions.setProductFilterState}
      />
    </View>
  );
};
export default FilterBar;
