import styles from './styles';
import React from 'react';
import {Text, View} from 'react-native';
import {OrderIdIcon} from 'svg/common';

const OrderInfo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapOrderId}>
        <OrderIdIcon />
        <Text style={styles.labelOrderId}>&nbsp;Mã đơn hàng: 1234567890</Text>
      </View>
      <View style={styles.wrapOrderDate}>
        <Text style={styles.labelOrderDate}>
          Ngày đặt hàng: 12:00, 01/01/2021
        </Text>
      </View>
      <View style={styles.wrapOrderStatus}>
        <Text style={styles.labelOrderStatus}>Đang chờ thanh toán</Text>
      </View>
    </View>
  );
};

OrderInfo.defaultProps = {};

OrderInfo.propTypes = {};

export default OrderInfo;
