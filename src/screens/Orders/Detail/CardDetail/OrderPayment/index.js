import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {CreditSvg} from 'svg/common';
import Header from '../Header';

const OrderPayment = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header icon={<CreditSvg />} title="Phương thức thanh toán"></Header>
      <View style={styles.wrapBody}>
        <Text style={styles.labelBody}>Credit Card</Text>
      </View>
    </View>
  );
};

OrderPayment.defaultProps = {};

OrderPayment.propTypes = {};

export default OrderPayment;
