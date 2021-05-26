import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, TextInputRounded} from 'components';
import {Chip, Divider, Text} from 'react-native-paper';
import {Trending} from 'svg/common';
import {Colors} from 'components';
const WIDTH = Dimensions.get('window').width;
const MockSize = [
  'one-size',
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  '30',
  '40',
];
const Search = ({navigation}) => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.size')}</Text>
      </View>
      <View style={styles.wrapChip}>
        {MockSize.map((v, i) => (
          <Chip
            small
            onPress={() => setActiveItem(i)}
            style={[
              styles.itemChips,
              {
                borderColor:
                  activeItem === i ? Colors['$purple'] : Colors['$line'],
              },
            ]}
            key={`${v}-${i}`}>
            <Text
              style={[
                styles.priceText,
                {
                  color:
                    activeItem === i ? Colors['$purple'] : Colors['$black'],
                },
              ]}>
              {v}
            </Text>
          </Chip>
        ))}
      </View>
      <Divider />
    </>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
