/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

import {Chip, Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {RnRatingTap, Picker} from 'components';
const BottomHeaderAnimated = ({navigation}) => {
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
        <TouchableOpacity onPress={() => navigation.navigate('FilterProduct')}>
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
      <Picker visible={visible} setVisible={setVisible} setAction={setAction}>
        <RadioButton.Group
          value={valueSort}
          onValueChange={(value) => setValueSort(value)}
          color="#823ffd">
          <RadioButton.Item label="Liên quan nhất" value="default" />
          <RadioButton.Item label="Phổ biến nhất" value="new" />
        </RadioButton.Group>
      </Picker>
      <View style={styles.wrapBlockChips}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            small
            icon="map-marker"
            onPress={() => console.log('Pressed')}
            style={styles.itemChips}>
            Example Chip
          </Chip>
          <Chip
            small
            onPress={() => console.log('Pressed')}
            style={styles.itemChips}>
            Best-seller
          </Chip>
          <Chip
            small
            onPress={() => console.log('Pressed')}
            style={styles.itemChips}>
            Best-seller
          </Chip>
          <Chip
            small
            onPress={() => console.log('Pressed')}
            style={styles.itemChips}>
            Best-seller
          </Chip>
          <Chip
            small
            onPress={() => console.log('Pressed')}
            style={styles.itemChips}>
            Best-seller
          </Chip>
        </ScrollView>
      </View>
    </View>
  );
};

BottomHeaderAnimated.defaultProps = {};

BottomHeaderAnimated.propTypes = {};

export default BottomHeaderAnimated;
