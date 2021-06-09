import React from 'react';
import i18n from 'i18n';
import {TouchableOpacity, View, Text} from 'react-native';
import {Sort, Filter, CaretDown} from 'svg/common';
import {getProductFilterState} from 'redux/selectors/search/productFilter';

import styles from './styles';
import {useSelector} from 'react-redux';

const FilterBar = ({setVisible = () => {}, visible = false, navigation}) => {
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
  return (
    <View style={styles.wrapBlockOne}>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <View style={styles.contentBlockOne}>
          <View>
            <Sort />
          </View>
          <Text numberOfLines={1} style={styles.textSort}>
            {i18n.t('sort')}
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
  );
};
export default FilterBar;
