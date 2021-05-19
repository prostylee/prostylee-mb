/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Picker from '../Picker';
import {RnRatingTap} from 'components';
import {Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import Radio from '../Radio';

const BottomHeaderAnimated = ({navigation}) => {
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
          <Radio
            defaultActive="default"
            data={[
              {label: 'Default', key: 'default', value: 'default'},
              {label: 'Moi nhat', key: 'newest', value: 'newest'},
              {label: 'Cu nhat', key: 'oldest', value: 'oldest'},
            ]}
            onChange={() => console.log('hahaha')}
          />
        ) : (
          <Radio
            defaultActive={5}
            data={[
              {label: renderStar(5), key: '5', value: 5},
              {label: renderStar(4), key: '4', value: 4},
              {label: renderStar(3), key: '3', value: 3},
              {label: renderStar(2), key: '2', value: 2},
              {label: renderStar(1), key: '1', value: 1},
            ]}
            onChange={() => console.log('hahaha')}
            isRating={true}
          />
        )}
      </Picker>
    </>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
