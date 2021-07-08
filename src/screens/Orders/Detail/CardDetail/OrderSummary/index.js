import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {currencyFormat} from 'utils/currency';
import i18n from 'i18n';
import {CURRENCY_VIET_NAM} from 'constants';

const OrderSummary = ({
  navigation,
  totalMoney = 0,
  shippingFee = 0,
  totalDiscount = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>{i18n.t('orders.summaryTotal')}</Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valuePrice}>
            {currencyFormat(totalMoney || 0, CURRENCY_VIET_NAM)}
          </Text>
        </View>
      </View>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>
            {i18n.t('orders.summaryDeliveryFee')}
          </Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valuePrice}>
            {currencyFormat(shippingFee || 0, CURRENCY_VIET_NAM)}
          </Text>
        </View>
      </View>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>
            {i18n.t('orders.summaryVoucher')}
          </Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valuePrice}>
            {currencyFormat(totalDiscount || 0, CURRENCY_VIET_NAM)}
          </Text>
        </View>
      </View>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>
            {i18n.t('orders.summaryTotalPayment')}
          </Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valueTotal}>
            {currencyFormat(
              totalMoney + shippingFee - totalDiscount,
              CURRENCY_VIET_NAM,
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

OrderSummary.defaultProps = {};

OrderSummary.propTypes = {};

export default OrderSummary;
