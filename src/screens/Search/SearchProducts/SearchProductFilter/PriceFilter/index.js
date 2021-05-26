import React from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';

import {ThemeView, Header, TextInputRounded} from 'components';
import {Chip, Divider, Text} from 'react-native-paper';
import {Trending} from 'svg/common';
import Colors from '../../../../../components/Colors';
const WIDTH = Dimensions.get('window').width;
const PriceFilter = ({navigation}) => {
  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.priceRange')}</Text>
        <Text
          style={[
            styles.title,
            {
              color: Colors['$black500'],
            },
          ]}>
          0đ - 100.000đ
        </Text>
      </View>
      <View style={styles.wrapChip}>
        <MultiSlider
          sliderLength={WIDTH - 32}
          selectedStyle={{backgroundColor: Colors['$black'], height: 5}}
          unselectedStyle={{backgroundColor: Colors['$line'], height: 5}}
          markerStyle={{
            backgroundColor: Colors['$black'],
            borderWidth: 0,
            width: 20,
            height: 20,
          }}
          markerOffsetY={2}
          enabledTwo={true}
          enabledOne={true}
          isMarkersSeparated={true}
        />
      </View>
      <Divider />
    </>
  );
};

PriceFilter.defaultProps = {};

PriceFilter.propTypes = {};

export default PriceFilter;
