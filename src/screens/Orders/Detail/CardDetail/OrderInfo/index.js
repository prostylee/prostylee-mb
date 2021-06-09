import styles from './styles';
import React from 'react';
import {Text, View} from 'react-native';
import {OrderIdIcon} from 'svg/common';
import i18n from 'i18n';

const OrderInfo = ({dealData}) => {
  const {dealId, deal, status} = dealData;

  const renderStatus = () => {
    switch (status) {
      case 'waiting':
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {i18n.t('orders.statusWaiting')}
          </Text>
        );
      case 'delivery':
        return (
          <Text style={{...styles.labelOrderStatus, color: '#F48231'}}>
            {i18n.t('orders.statusDelivery')}
          </Text>
        );
      case 'done':
        return (
          <Text style={{...styles.labelOrderStatus, color: '#3FBA44'}}>
            {i18n.t('orders.statusDone')}
          </Text>
        );
      case 'cancel':
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {i18n.t('orders.statusCancel')}
          </Text>
        );

      default:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#333333'}}>
            {i18n.t('orders.statusCancel')}
          </Text>
        );
    }
  };

  switch (status) {
    case 'cancel':
      return (
        <View style={styles.container}>
          <View style={styles.wrapOrderId}>
            <OrderIdIcon />
            <View style={styles.wrapOrderStatus}>&nbsp;{renderStatus()}</View>
          </View>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <View style={styles.wrapOrderId}>
            <OrderIdIcon />
            <Text style={styles.labelOrderId}>
              &nbsp;{i18n.t('orders.dealId', {id: 1234567890})}
            </Text>
          </View>
          <View style={styles.wrapOrderDate}>
            <Text style={styles.labelOrderDate}>
              {i18n.t('orders.dealDate', {date: '12:00, 01/01/2021'})}
            </Text>
          </View>
          <View style={styles.wrapOrderStatus}>{renderStatus()}</View>
        </View>
      );
  }
};

OrderInfo.defaultProps = {};

OrderInfo.propTypes = {};

export default OrderInfo;
