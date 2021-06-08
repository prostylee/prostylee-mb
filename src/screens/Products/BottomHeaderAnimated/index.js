/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

import {Chip, Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import SortDropDown from '../SortDropDown';

import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {RnRatingTap, Picker} from 'components';
import TagList from '../TagList';

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
            <Filter />
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
