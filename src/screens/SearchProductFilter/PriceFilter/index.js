import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';
import {Divider, Text} from 'react-native-paper';
import {CURRENCY_VIET_NAM} from 'constants';

import {currencyFormat} from 'utils/currency';

import PropTypes from 'prop-types';

const WIDTH = Dimensions.get('window').width;
const PriceFilter = ({
  onPriceChange,
  defaultState,
  minValue = 0,
  maxValue = 50_000_000,
}) => {
  const priceState = defaultState.price;
  const [state, setState] = useState(
    priceState && priceState.length ? [priceState[0], priceState[1]] : [0, 1],
  );

  useEffect(() => {
    if (priceState && priceState.length) {
      setState([priceState[0], priceState[1]]);
    }
  }, [priceState]);

  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.priceRange')}</Text>
        <Text style={[styles.title, styles.black500]}>
          {currencyFormat(state[0], CURRENCY_VIET_NAM)} -{' '}
          {currencyFormat(state[1], CURRENCY_VIET_NAM)}
        </Text>
      </View>
      <View style={styles.wrapChip}>
        <MultiSlider
          sliderLength={WIDTH - 32}
          selectedStyle={styles.selectedStyles}
          unselectedStyle={styles.unSelectedStyles}
          markerStyle={styles.markerStyles}
          onValuesChange={(value) => {
            setState(value);
          }}
          onValuesChangeFinish={(value) => {
            onPriceChange('price', value);
          }}
          values={[state?.[0], state?.[1]]}
          min={minValue}
          max={maxValue}
          markerOffsetY={2}
          step={Math.round(maxValue / 5000)}
          enabledTwo={true}
          isMarkersSeparated={true}
        />
      </View>
      <Divider />
    </>
  );
};

PriceFilter.defaultProps = {onPriceChange: () => {}, defaultState: {}};

PriceFilter.propTypes = {
  onPriceChange: PropTypes.func.isRequired,
  defaultState: PropTypes.object.isRequired,
};

export default PriceFilter;
