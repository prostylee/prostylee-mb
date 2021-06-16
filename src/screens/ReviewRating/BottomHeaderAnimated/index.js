/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Picker from '../Picker';
import {AirbnbRating, CustomRating} from 'components';
import {Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import {RadioButton} from 'react-native-paper';

const BottomHeaderAnimated = ({
  sortValue,
  filterValue,
  setSortValue,
  setFilterValue,
}) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState(null);

  const onSort = (e) => {
    e.preventDefault();
    if (action === 'sort') {
      setAction(null);
      setVisible(false);
      return;
    }
    setAction('sort');
    setVisible(true);
  };

  const onFilter = (e) => {
    e.preventDefault();
    if (action === 'filter') {
      setAction(null);
      setVisible(false);
      return;
    }
    setAction('filter');
    setVisible(true);
  };

  const renderStar = (star) => <CustomRating rate={star} size={20} />;

  const handleSort = (value) => {
    setSortValue(value);
    setAction(null);
    setVisible(false);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
    setAction(null);
    setVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Divider />
        <View style={styles.wrapBlockOne}>
          <TouchableOpacity onPress={onSort} style={styles.contentBlockOne}>
            <View>
              <Sort />
            </View>
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('sort')}
            </Text>
            <View>
              <CaretDown />
            </View>
          </TouchableOpacity>
          <View style={styles.wrapBlockFilter}>
            <Text numberOfLines={1} style={styles.textSpace}>
              |
            </Text>
            <TouchableOpacity onPress={onFilter} style={styles.contentBlockOne}>
              <Filter />
              <Text numberOfLines={1} style={styles.textSort}>
                {i18n.t('filter')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider />
      </View>
      <Picker visible={visible} setVisible={setVisible} setAction={setAction}>
        {action === 'sort' ? (
          <RadioButton.Group
            onValueChange={handleSort}
            value={sortValue}
            color="#823ffd">
            <RadioButton.Item
              label={i18n.t('reviewRating.default')}
              value="default"
              mode="ios"
              color="#823ffd"
            />
            <RadioButton.Item
              label={i18n.t('reviewRating.newest')}
              value="newest"
              mode="ios"
              color="#823ffd"
            />
            <RadioButton.Item
              label={i18n.t('reviewRating.oldest')}
              value="oldest"
              mode="ios"
              color="#823ffd"
            />
          </RadioButton.Group>
        ) : (
          <RadioButton.Group
            onValueChange={handleFilter}
            value={filterValue}
            color="#823ffd">
            <RadioButton.Item
              label={renderStar(5)}
              mode="ios"
              labelStyle={styles.wrapLabelRadioButton}
              value={5}
              color="#823ffd"
            />
            <RadioButton.Item
              label={renderStar(4)}
              mode="ios"
              labelStyle={styles.wrapLabelRadioButton}
              value={4}
              color="#823ffd"
            />
            <RadioButton.Item
              label={renderStar(3)}
              mode="ios"
              labelStyle={styles.wrapLabelRadioButton}
              value={3}
              color="#823ffd"
            />
            <RadioButton.Item
              label={renderStar(2)}
              mode="ios"
              labelStyle={styles.wrapLabelRadioButton}
              value={2}
              color="#823ffd"
            />
            <RadioButton.Item
              label={renderStar(1)}
              mode="ios"
              labelStyle={styles.wrapLabelRadioButton}
              value={1}
              color="#823ffd"
            />
          </RadioButton.Group>
        )}
      </Picker>
    </>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
