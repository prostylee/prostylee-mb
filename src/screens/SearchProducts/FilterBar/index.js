import React from 'react';
import i18n from 'i18n';
import {TouchableOpacity, View, Text} from 'react-native';
import {Sort, CaretDown} from 'svg/common';
import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {searchActions} from 'redux/reducers';
import styles from './styles';

import {Colors, FilterButton} from 'components';

import PropTypes from 'prop-types';

const FilterBar = ({
  setVisible = () => {},
  visible = false,
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
      <FilterButton getFilterStateSelectorFunction={getProductFilterState} />
    </View>
  );
};
FilterBar.defaultProps = {
  setVisible: () => {},
  visible: false,
  sortActiveItem: '',
};

FilterBar.propTypes = {
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  sortActiveItem: PropTypes.string.isRequired,
};
export default FilterBar;
