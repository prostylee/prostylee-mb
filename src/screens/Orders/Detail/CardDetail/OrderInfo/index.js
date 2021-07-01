import styles from './styles';
import React from 'react';
import {Text, View} from 'react-native';
import {OrderIdIcon} from 'svg/common';
import i18n from 'i18n';
const CREATE_ORDER = 0,
  RECEIVE_ORDER = 10,
  GOOD_ISSUE = 20,
  DELIVERY = 30,
  CANCEL_ORDER = 90,
  COMPLETED = 100;
const OrderInfo = ({dealData, infor = {}}) => {
  const {dealId, deal, status} = dealData;

  const renderStatus = (status) => {
    switch (status?.actCode) {
      case RECEIVE_ORDER:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {/* {i18n.t('orders.statusWaiting')} */}
            {status?.statusName}
          </Text>
        );
      case DELIVERY:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#F48231'}}>
            {/* {i18n.t('orders.statusDelivery')} */}
            {status?.statusName}
          </Text>
        );
      case COMPLETED:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#3FBA44'}}>
            {/* {i18n.t('orders.statusDone')} */}
            {status?.statusName}
          </Text>
        );
      case CANCEL_ORDER:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {/* {i18n.t('orders.statusCancel')} */}
            {status?.statusName}
          </Text>
        );

      default:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#333333'}}>
            {/* {i18n.t('orders.statusCancel')} */}
            {status?.statusName}
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
            <View style={styles.wrapOrderStatus}>
              <Text>&nbsp;{renderStatus()}</Text>
            </View>
          </View>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <View style={styles.wrapOrderId}>
            <OrderIdIcon />
            <Text style={styles.labelOrderId}>
              &nbsp;{i18n.t('orders.dealId', {id: infor?.code})}
            </Text>
          </View>
          <View style={styles.wrapOrderDate}>
            <Text style={styles.labelOrderDate}>
              {i18n.t('orders.dealDate', {
                date: infor?.createdAt,
              })}
            </Text>
          </View>
          <View style={styles.wrapOrderStatus}>
            {renderStatus(infor?.orderHistory?.[0])}
          </View>
        </View>
      );
  }
};

OrderInfo.defaultProps = {};

OrderInfo.propTypes = {};

export default OrderInfo;
