import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {TrackingIcon} from 'svg/common';
import Header from '../Header';
import {currencyFormat} from 'utils/currency';
import i18n from 'i18n';

const OrderDelivery = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header icon={<TrackingIcon />} title={i18n.t('orders.deliveryMethod')} />
      <View style={styles.wrapBody}>
        <View style={styles.wrapBodyTitle}>
          <View style={styles.wrapBodyName}>
            <Text style={styles.labelBodyName}>Grap</Text>
          </View>
          <View style={styles.wrapBodyPrice}>
            <Text style={styles.labelBodyPrice}>
              {currencyFormat(25000, 'đ')}
            </Text>
          </View>
        </View>
        <View style={styles.wrapBodyContent}>
          <Text style={styles.labelBodyContent}>
            Nhận hàng vào 29-12 đến 31-12
          </Text>
        </View>
      </View>
    </View>
  );
};

OrderDelivery.defaultProps = {};

OrderDelivery.propTypes = {};

export default OrderDelivery;
