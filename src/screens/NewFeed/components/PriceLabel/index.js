import {Text} from 'react-native';
import React from 'react';
import {currencyFormat} from 'utils/currency';
import PropTypes from 'prop-types';

import styles from './styles';

const PriceLabel = ({price, priceSale}) => {
  return (
    <Text style={styles.price}>
      {currencyFormat(priceSale ? priceSale : price, 'đ')}
    </Text>
  );
};

PriceLabel.propTypes = {
  price: PropTypes.number.isRequired,
  priceSale: PropTypes.number,
};

export default PriceLabel;