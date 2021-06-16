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
import {RnRatingTap, Picker, Colors} from 'components';
import {useSelector} from 'react-redux';
import TagList from '../TagList';
import {PRODUCT_SORT_ITEM} from 'constants';

const BottomHeaderAnimated = ({
  navigation,
  onTagPress = () => {},
  onSortPress = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;
  const price = filterState.price;
  let count = 0;
  count += categoryFilterState !== -1 ? 1 : 0;
  count += Object.keys(
    attributeFilterState ? attributeFilterState : {},
  )?.length;
  count += price?.[1] !== 0 ? 1 : 0;

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
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchProductFilter')}>
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
                  <Text
                    style={{color: '#fff', fontSize: 10, textAlign: 'center'}}>
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
