import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {CreditSvg} from 'svg/common';
import Header from '../Header';
import i18n from 'i18n';

const OrderPayment = ({navigation, paymentType = ''}) => {
  return (
    <View style={styles.container}>
      <Header
        icon={<CreditSvg />}
        title={i18n.t('orders.paymentMethod')}></Header>
      <View style={styles.wrapBody}>
        <Text style={styles.labelBody}>{paymentType}</Text>
      </View>
    </View>
  );
};

OrderPayment.defaultProps = {};

OrderPayment.propTypes = {};

export default OrderPayment;
