import React from 'react';
import i18n from 'i18n';
import {TouchableOpacity, View, Text} from 'react-native';
import {Sort, Filter, CaretDown} from 'svg/common';
import {getProductFilterState} from 'redux/selectors/search/productFilter';

import styles from './styles';
import {useSelector} from 'react-redux';
import {Colors, FilterButton} from 'components';

const FilterBar = ({
  setVisible = () => {},
  visible = false,
  navigation,
  activeSortItem = '',
  getFilterStateSelectorFunction = () => {},
}) => {
  const filterState = useSelector((state) =>
    getFilterStateSelectorFunction(state),
  );
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;
  const price = filterState.price;
  let count = 0;
  count += categoryFilterState !== -1 ? 1 : 0;
  count += Object.keys(
    attributeFilterState ? attributeFilterState : {},
  )?.length;
  count += price?.[1] !== 0 ? 1 : 0;
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
        getFilterStateSelectorFunction={getFilterStateSelectorFunction}
      />
    </View>
  );
};
export default FilterBar;
