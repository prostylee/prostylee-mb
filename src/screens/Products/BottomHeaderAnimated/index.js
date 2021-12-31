/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Divider} from 'react-native-paper';
import {Sort, CaretDown} from 'svg/common';
import i18n from 'i18n';

import styles from './styles';

import {FilterButton, Colors} from 'components';

import {PRODUCT_SORT_ITEM} from 'constants';

import ProductsCategories from '../Categories';

const BottomHeaderAnimated = ({
  onTagPress = () => {},
  setVisible,
  visible,
  valueSort,
}) => {
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
        {/* <FilterButton
          getFilterStateSelectorFunction={
            getProductCategoriesFilterStateSelector
          }
        /> */}
      </View>
      <Divider />
      <ProductsCategories />
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
