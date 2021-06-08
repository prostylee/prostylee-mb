import React from 'react';
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
  console.log('PRICE STATE', priceState);

  const _handleValueChangeDebounce = debounce(
    (value) => {
      onPriceChange(value);
    },
    1000,
    {maxWait: 2000, trailing: true, leading: false},
  );

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
          {currencyFormat(minValue, 'đ')} - {currencyFormat(maxValue, 'đ')}
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
          onValuesChange={_handleValueChangeDebounce}
          values={[priceState?.[0], priceState?.[1]]}
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
