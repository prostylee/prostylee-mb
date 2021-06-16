import React from 'react';

import {TouchableOpacity, View, Text} from 'react-native';
import {Check} from 'svg/common';
import {Image} from 'components';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
const Item = ({item, selectedBrand, onPress, disabled = false}) => {
  const {colors} = useTheme();
  const active = selectedBrand.id === item.id;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.itemcontainer}>
        {active ? (
          <View
            style={[
              styles.img,
              {
                backgroundColor: colors['$purple'],
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Check />
          </View>
        ) : (
          <Image
            source={
              item.icon ? {uri: item.icon} : require('assets/images/uniqlo.png')
            }
            resizeMode={'cover'}
            style={[
              styles.img,
              {
                borderWidth: 4,
                borderColor: active ? colors['$purple'] : 'transparent',
              },
            ]}
          />
        )}

        <Text
          style={[
            styles.Card,
            {
              color: active ? colors['$purple'] : colors['$black'],
            },
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Item;
