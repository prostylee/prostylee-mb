/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Divider} from 'react-native-paper';
import {Sort, CaretDown} from 'svg/common';
import i18n from 'i18n';

import styles from './styles';

import {FilterButton, Colors, TagList} from 'components';

import {PRODUCT_SORT_ITEM} from 'constants';

import {getBrandProductFilterStateSelector} from 'redux/selectors/brand';

import {userSelectors} from 'reducers';
import {useSelector} from 'react-redux';

const BottomHeaderAnimated = ({
  onTagPress = () => {},
  setVisible,
  visible,
  valueSort,
}) => {
  const location = useSelector((state) => userSelectors.getUserLocation(state));

  const [filterTags, setFilterTags] = useState([
    {
      label: 'Best-seller',
      value: {
        bestSeller: true,
      },
    },
    {
      label: 'Gần đây',
      value: {
        latitude: location?.lat || 10.806406363857086,
        longitude: location?.lon || 106.6634168400805,
      },
    },
    {
      label: 'Sale',
      value: {
        sale: true,
      },
    },
  ]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      setFilterTags([
        {
          label: 'Best-seller',
          value: {
            bestSeller: true,
          },
        },
        {
          label: 'Gần đây',
          value: {
            latitude: location?.lat,
            longitude: location?.lon,
          },
        },
        {
          label: 'Sale',
          value: {
            sale: true,
          },
        },
      ]);
    }
  }, [location?.lat, location?.lon]);
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
          getFilterStateSelectorFunction={getBrandProductFilterStateSelector}
        />
      </View>
      <Divider />
      <TagList onTagPress={onTagPress} options={filterTags} />
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
