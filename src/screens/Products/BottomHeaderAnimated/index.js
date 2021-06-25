/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Divider} from 'react-native-paper';
import {Sort, CaretDown} from 'svg/common';
import i18n from 'i18n';

import styles from './styles';

import {
  RnRatingTap,
  FilterButton,
  Colors,
  SortDropDown,
  TagList,
} from 'components';

import {PRODUCT_SORT_ITEM} from 'constants';

import {getProductCategoriesFilterStateSelector} from 'redux/selectors/product';
import {productActions} from 'redux/reducers';
import useLocation from 'hooks/useLocation';
const BottomHeaderAnimated = ({
  onTagPress = () => {},
  setVisible,
  visible,
  valueSort,
}) => {
  const location = useLocation();
  const FILTER_TAGS = [
    {
      label: 'Gần đây',
      value: {
        latitude: location?.lat || 10.806406363857086,
        longitude: location?.lon || 106.6634168400805,
      },
    },
    {
      label: 'Best-seller',
      value: {
        bestSeller: true,
      },
    },
    {
      label: 'Sale',
      value: {
        sale: true,
      },
    },
  ];
  return (
    <View style={styles.container}>
      <Divider />
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
              {valueSort
                ? PRODUCT_SORT_ITEM.find((v) => v.value === valueSort).label
                : ''}
            </Text>

            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
        <FilterButton
          filterDispatchAction={productActions.getListProduct}
          getFilterStateSelectorFunction={
            getProductCategoriesFilterStateSelector
          }
          clearFilterStateAction={
            productActions.clearProductCategoriesFilterState
          }
          setFilterStateAction={productActions.setProductCategoriesFilterState}
        />
      </View>
      <Divider />
      <TagList onTagPress={onTagPress} options={FILTER_TAGS} />
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
