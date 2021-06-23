import React from 'react';
import i18n from 'i18n';
import {TouchableOpacity, View, Text} from 'react-native';
import {Sort, Filter, CaretDown} from 'svg/common';
import {getProductFilterState} from 'redux/selectors/search/productFilter';

import styles from './styles';
import {useSelector} from 'react-redux';
import {Colors, FilterButton} from 'components';
import {getStoreProfileFilterStateSelector} from 'redux/selectors/storeProfile';
import {storeProfileActions} from 'redux/reducers';

const FilterBar = ({
  setVisible = () => {},
  visible = false,
  navigation,
  activeSortItem = '',
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
            {activeSortItem}
          </Text>
          <View>
            <CaretDown />
          </View>
        </View>
      </TouchableOpacity>

      <FilterButton
        filterDispatchAction={storeProfileActions.getAllStoreProduct}
        getFilterStateSelectorFunction={getStoreProfileFilterStateSelector}
        clearFilterStateAction={
          storeProfileActions.clearStoreProfileFilterState
        }
        setFilterStateAction={storeProfileActions.setStoreProfileFilterState}
      />
    </View>
  );
};
export default FilterBar;
