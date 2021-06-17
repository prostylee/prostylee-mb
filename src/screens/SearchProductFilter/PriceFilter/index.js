import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';
import {Divider, Text} from 'react-native-paper';
import debounce from 'lodash/debounce';
import {Colors} from 'components';
import {currencyFormat} from 'utils/currency';
import {getProductFilterState} from 'redux/selectors/search/productFilter';
import {useSelector} from 'react-redux';
const WIDTH = Dimensions.get('window').width;
const PriceFilter = ({
  minValue = 0,
  maxValue = 1000000,
  onPriceChange = () => {},
}) => {
  const filterState = useSelector((state) => getProductFilterState(state));
  const priceState = filterState.price;
  const [state, setState] = useState([priceState[0], priceState[1]]);

  useEffect(() => {
    setState([priceState[0], priceState[1]]);
  }, [priceState]);
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
          {currencyFormat(state[0], 'đ')} - {currencyFormat(state[1], 'đ')}
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
          enabledTwo={true}
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
