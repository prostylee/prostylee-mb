/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

import {Chip, Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import SortDropDown from '../SortDropDown';
import {getProductFilterState} from 'redux/selectors/search/productFilter';

import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {RnRatingTap, FilterButton, Colors} from 'components';
import {useSelector} from 'react-redux';
import TagList from '../TagList';
import {PRODUCT_SORT_ITEM} from 'constants';

import {getProductCategoriesFilterStateSelector} from 'redux/selectors/product';
import {productActions} from 'redux/reducers';
const BottomHeaderAnimated = ({
  navigation,
  onTagPress = () => {},
  onSortPress = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const renderStar = (star) => (
    <RnRatingTap
      onChangeValue={() => {}}
      value={star}
      isDisabled={true}
      size={20}
    />
  );
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
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={(value) => {
          setValueSort(value);
          onSortPress(value);
        }}
        valueSort={valueSort}
      />
      <TagList onTagPress={onTagPress} />
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
