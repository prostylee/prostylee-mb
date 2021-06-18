import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {Divider, Text} from 'react-native-paper';

import {Colors} from 'components';
import PropTypes from 'prop-types';

const BlockFilter = ({attribute, onSelect, defaultState}) => {
  // const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = defaultState?.attributes;

  const [state, setState] = useState(attributeFilterState);

  const activeItem = state?.[`${attribute.key}`];

  const {allowsMultipleSelection} = attribute;

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
      }
    } else {
      newFilterState[`${attribute.key}`] = attributeId;
    }

    onSelect('attributes', {...newFilterState});
    setState({...newFilterState});
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

  useEffect(() => {
    setState(attributeFilterState);
  }, [attributeFilterState]);
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
            {i18n.t('Search.resultsNotfound')}
          </Text>
        )}
      </View>
      <Divider />
    </>
  );
};

BlockFilter.defaultProps = {
  attributes: {},
  onSelect: () => {},
  defaultState: {},
};

BlockFilter.propTypes = {
  attributes: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  defaultState: PropTypes.object.isRequired,
};

export default BlockFilter;
