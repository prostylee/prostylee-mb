import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

const PriceSaleLabel = ({price, priceSale}) => {
  const [discountInPercent, setDiscountInPercent] = useState(0);

  useEffect(() => {
    if (
      price === undefined ||
      price == null ||
      priceSale === undefined ||
      priceSale == null
    ) {
      setDiscountInPercent(0);
    } else if (priceSale === 0) {
      setDiscountInPercent(100);
    } else if (priceSale === price) {
      setDiscountInPercent(0);
    } else {
      const discount = ((price - priceSale) / price) * 100;
      setDiscountInPercent(Math.min(Math.floor(discount), 100));
    }
  }, [price, priceSale]);

  if (discountInPercent === 0) {
    return null;
  }

  return (
    <View style={styles.discountPercent}>
      <Text style={styles.textDiscount}>{`Giảm ${discountInPercent} %`}</Text>
    </View>
  );
};

PriceSaleLabel.propTypes = {
  price: PropTypes.number.isRequired,
  priceSale: PropTypes.number.isRequired,
};
PriceSaleLabel.defaultProps = {
  price: 0,
  priceSale: 0,
};

export default PriceSaleLabel;
