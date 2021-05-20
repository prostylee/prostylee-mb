/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Picker from '../Picker';
import {RnRatingTap} from 'components';
import {Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import {RadioButton} from 'react-native-paper';

const BottomHeaderAnimated = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [valueSort, setValueSort] = useState();
  const [valueFilter, setValueFilter] = useState();

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

  const onFilter = () => {
    if (action === 'filter') {
      setAction(null);
      setVisible(false);
      return;
    }
    setAction('filter');
    setVisible(true);
  };

  const renderStar = (star) => (
    <RnRatingTap
      onChangeValue={() => {}}
      value={star}
      isDisabled={true}
      size={20}
    />
  );

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
            onValueChange={(value) => setValueSort(value)}
            value={valueSort}
            color="#823ffd">
            <RadioButton.Item
              label={i18n.t('reviewRating.default')}
              value="default"
            />
            <RadioButton.Item
              label={i18n.t('reviewRating.newest')}
              value="newest"
            />
            <RadioButton.Item
              label={i18n.t('reviewRating.oldest')}
              value="oldest"
            />
          </RadioButton.Group>
        ) : (
          <RadioButton.Group
            onValueChange={(value) => setValueFilter(value)}
            value={valueFilter}
            color="#823ffd">
            <RadioButton.Item label={renderStar(5)} value={5} />
            <RadioButton.Item label={renderStar(4)} value={4} />
            <RadioButton.Item label={renderStar(3)} value={3} />
            <RadioButton.Item label={renderStar(2)} value={2} />
            <RadioButton.Item label={renderStar(1)} value={1} />
          </RadioButton.Group>
        )}
      </Picker>
    </>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
