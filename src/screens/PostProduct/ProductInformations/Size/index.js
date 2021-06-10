import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';

import styles from './styles';

import {Header, ButtonRounded, HeaderBack} from 'components';
import {Chip, Divider, Text} from 'react-native-paper';
import {Colors} from 'components';
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
  '39',
  '38',
  '37',
  '42',
  '35',
  '41',
  '34',
  '36',
];
const Size = ({navigation}) => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.wrapChip}>
        {MockSize.map((v, i) => (
          <TouchableOpacity
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
          </TouchableOpacity>
        ))}
        <Divider />
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Chọn" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Size;
