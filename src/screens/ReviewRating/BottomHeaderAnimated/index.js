/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform, Dimensions} from 'react-native';
import Picker from '../Picker';
import {AirbnbRating, CustomRating} from 'components';
import {Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import {RadioButton} from 'react-native-paper';

import {getStatusBarHeight} from 'react-native-status-bar-height';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HEIGHT_HEADER =
  Platform.OS === 'android' ? getStatusBarHeight() + 25 : getStatusBarHeight();
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
    if (filterValue !== value) {
      setFilterValue(value);
    } else {
      setFilterValue(undefined);
    }
    setAction(null);
    setVisible(false);
  };
  const sortStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: WIDTH,
    height: visible ? HEIGHT : 0,
    marginTop: visible ? HEIGHT_HEADER : 0,
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
      <View style={sortStyle}>
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
              <Divider />
              <RadioButton.Item
                label={i18n.t('reviewRating.newest')}
                value="newest"
                mode="ios"
                color="#823ffd"
              />
              <Divider />
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
              <Divider />
              <RadioButton.Item
                label={renderStar(4)}
                mode="ios"
                labelStyle={styles.wrapLabelRadioButton}
                value={4}
                color="#823ffd"
              />
              <Divider />
              <RadioButton.Item
                label={renderStar(3)}
                mode="ios"
                labelStyle={styles.wrapLabelRadioButton}
                value={3}
                color="#823ffd"
              />
              <Divider />
              <RadioButton.Item
                label={renderStar(2)}
                mode="ios"
                labelStyle={styles.wrapLabelRadioButton}
                value={2}
                color="#823ffd"
              />
              <Divider />
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
      </View>
    </>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
