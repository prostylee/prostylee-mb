import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {currencyFormat} from 'utils/currency';

const OrderSummary = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>Tổng tiền hàng</Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valuePrice}>{currencyFormat(99999, 'đ')}</Text>
        </View>
      </View>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>Phí vận chuyển</Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valuePrice}>{currencyFormat(99999, 'đ')}</Text>
        </View>
      </View>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>Mã giảm giá</Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valuePrice}>{currencyFormat(99999, 'đ')}</Text>
        </View>
      </View>
      <View style={styles.rowPrice}>
        <View style={styles.wrapLabelPrice}>
          <Text style={styles.labelPrice}>Tổng thanh toán</Text>
        </View>
        <View style={styles.wrapValuePrice}>
          <Text style={styles.valueTotal}>{currencyFormat(99999, 'đ')}</Text>
        </View>
      </View>
    </View>
  );
};

OrderSummary.defaultProps = {};

OrderSummary.propTypes = {};

export default OrderSummary;
