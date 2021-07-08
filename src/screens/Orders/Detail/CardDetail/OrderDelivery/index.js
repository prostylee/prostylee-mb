import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {TrackingIcon} from 'svg/common';
import Header from '../Header';
import {currencyFormat} from 'utils/currency';
import i18n from 'i18n';
import {CURRENCY_VIET_NAM} from 'constants';

const OrderDelivery = ({shippingProvider = {}}) => {
  return (
    <View style={styles.container}>
      <Header icon={<TrackingIcon />} title={i18n.t('orders.deliveryMethod')} />
      <View style={styles.wrapBody}>
        <View style={styles.wrapBodyTitle}>
          <View style={styles.wrapBodyName}>
            <Text style={styles.labelBodyName}>{shippingProvider?.name}</Text>
          </View>
          <View style={styles.wrapBodyPrice}>
            <Text style={styles.labelBodyPrice}>
              {currencyFormat(shippingProvider?.price || 0, CURRENCY_VIET_NAM)}
            </Text>
          </View>
        </View>
        <View style={styles.wrapBodyContent}>
          <Text style={styles.labelBodyContent}>
            {shippingProvider?.deliveryTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

OrderDelivery.defaultProps = {};

OrderDelivery.propTypes = {};

export default OrderDelivery;
