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

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const filterAttributeList = useSelector((state) =>
    getProductFilterAttributeListSelector(state),
  );
  const sizeAttribute = filterAttributeList?.filter(
    (v) => v.key === 'kich_co',
  )[0];
  const ListSize = sizeAttribute?.attributeOptions;

  const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;

  const activeItem = attributeFilterState?.[`${sizeAttribute.id}`];

  const _handleChangeActiveSize = (sizeId) => {
    let newFilterState = {...attributeFilterState};
    newFilterState[`${sizeAttribute.id}`] = sizeId;
    dispatch(
      searchActions.setProductFilterState({
        attributes: {...newFilterState},
        category: categoryFilterState,
      }),
    );
  };

  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.size')}</Text>
      </View>
      <View style={styles.wrapChip}>
        {ListSize && ListSize.length ? (
          ListSize.map((v, i) => (
            <TouchableOpacity
              onPress={() => _handleChangeActiveSize(v?.id)}
              style={[
                styles.itemChips,
                {
                  borderColor:
                    activeItem === v.id ? Colors['$purple'] : Colors['$line'],
                },
              ]}
              key={`${v.id}-${i}`}>
              <Text
                style={[
                  styles.priceText,
                  {
                    color:
                      activeItem === v.id
                        ? Colors['$purple']
                        : Colors['$black'],
                  },
                ]}>
                {v?.label}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{color: Colors['$lightGray']}}>Can not load size</Text>
        )}
      </View>
      <Divider />
    </>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
