/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import {Chip, Divider} from 'react-native-paper';
import {Sort, Filter, CaretDown} from 'svg/common';
import i18n from 'i18n';
import styles from './styles';

const BottomHeaderAnimated = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.wrapBlockOne}>
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
        <View style={styles.wrapBlockFilter}>
          <Text numberOfLines={1} style={styles.textSpace}>
            |
          </Text>
          <Filter />
          <Text numberOfLines={1} style={styles.textSort}>
            {i18n.t('filter')}
          </Text>
        </View>
      </View>
      <Divider />
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
