import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, TextInputRounded} from 'components';
import {Chip, Divider, Text} from 'react-native-paper';
import {Trending} from 'svg/common';
import {Colors} from 'components';
import {getProductFilterAttributeListSelector} from 'redux/selectors/search/productFilter';
import {useDispatch, useSelector} from 'react-redux';
import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {searchActions} from 'redux/reducers';

const BlockFilter = ({attribute}) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;

  const activeItem = attributeFilterState?.[`${attribute.key}`];

  const {allowsMultipleSelection} = attribute;
  // let allowsMultipleSelection = true;

  let listOption = attribute.attributeOptions;

  const _handleChangeActiveSize = (attributeId) => {
    let newFilterState = {...attributeFilterState};
    let currentAttributeStateItem = newFilterState[`${attribute.key}`];
    if (allowsMultipleSelection) {
      let flag =
        currentAttributeStateItem && currentAttributeStateItem.length
          ? currentAttributeStateItem.indexOf(attributeId)
          : -999;

      if (flag < 0) {
        newFilterState[`${attribute.key}`] =
          currentAttributeStateItem && currentAttributeStateItem.length
            ? [...currentAttributeStateItem, attributeId]
            : [attributeId];
      } else {
        currentAttributeStateItem.splice(flag, 1);
        //newFilterState[`${attribute.id}`] = currentAttributeStateItem;
      }
    } else {
      newFilterState[`${attribute.key}`] = attributeId;
    }

    dispatch(
      searchActions.setProductFilterState({
        ...filterState,
        attributes: {...newFilterState},
      }),
    );
  };
  const isItemActive = (itemId) => {
    if (allowsMultipleSelection) {
      return activeItem && activeItem.length
        ? activeItem.indexOf(itemId) !== -1
          ? true
          : false
        : false;
    } else {
      return activeItem === itemId;
    }
  };

  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>
          {attribute.label ? attribute.label : ''}
        </Text>
      </View>
      <View style={styles.wrapChip}>
        {listOption && listOption.length ? (
          listOption.map((v, i) => (
            <TouchableOpacity
              onPress={() => _handleChangeActiveSize(v?.value)}
              style={[
                styles.itemChips,
                {
                  borderColor: isItemActive(v.value)
                    ? Colors['$purple']
                    : Colors['$line'],
                },
              ]}
              key={`${v.id}-${i}`}>
              <Text
                style={[
                  styles.priceText,
                  {
                    color: isItemActive(v.value)
                      ? Colors['$purple']
                      : Colors['$black'],
                  },
                ]}>
                {v?.label}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{color: Colors['$lightGray']}}>
            Can not load options
          </Text>
        )}
      </View>
      <Divider />
    </>
  );
};

BlockFilter.defaultProps = {};

BlockFilter.propTypes = {};

export default BlockFilter;
