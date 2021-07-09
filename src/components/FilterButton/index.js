import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Filter} from 'svg/common';
import styles from './styles';
import i18n from 'i18n';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const FilterButton = ({getFilterStateSelectorFunction, defaultQueryParams}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const filterState = useSelector((state) =>
    getFilterStateSelectorFunction(state),
  );
  const attributeFilterState = filterState?.attributes;

  const categoryFilterState = filterState.category;

  const price = filterState.price;

  let count = 0;
  count += categoryFilterState > 0 ? 1 : 0;
  count += Object.keys(
    attributeFilterState ? attributeFilterState : {},
  )?.length;
  count += price?.[1] !== 0 ? 1 : 0;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SearchProductFilter', {
          defaultQueryParams: defaultQueryParams,
          previousScreenName: route.name,
        })
      }>
      <View style={styles.wrapBlockFilter}>
        <Text numberOfLines={1} style={styles.textSpace}>
          |
        </Text>
        <View style={{position: 'relative'}}>
          <Filter />
          {count !== 0 ? (
            <View
              style={{
                position: 'absolute',
                width: 14,
                height: 14,
                backgroundColor: '#333333',
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}>
              <Text style={{color: '#fff', fontSize: 10, textAlign: 'center'}}>
                {count}
              </Text>
            </View>
          ) : null}
        </View>
        <Text numberOfLines={1} style={styles.textSort}>
          {i18n.t('filter')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

FilterButton.defaultProps = {
  getFilterStateSelectorFunction: () => {},
  defaultQueryParams: {},
};

FilterButton.propTypes = {
  getFilterStateSelectorFunction: PropTypes.func.isRequired,
  defaultQueryParams: PropTypes.object,
};
export default FilterButton;
