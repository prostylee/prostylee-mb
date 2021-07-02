import styles from './styles';
import React from 'react';
import {Text, View} from 'react-native';
import {OrderIdIcon} from 'svg/common';
import i18n from 'i18n';

import {ORDER_STATUS_ACT_CODE} from 'constants';

const OrderInfo = ({dealData = {}, infor = {}}) => {
  const {statusName} = infor;

  const renderStatus = () => {
    switch (infor?.actCode) {
      case ORDER_STATUS_ACT_CODE.PROCESSING:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#823FFD'}}>
            {statusName}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.ON_DELIVERY:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#F48231'}}>
            {statusName}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.COMPLETED:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#3FBA44'}}>
            {statusName}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.CANCEL_ORDER:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {statusName}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.WAIT_FOR_PAYMENT:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {statusName}
          </Text>
        );

      default:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#333333'}}>
            {statusName}
          </Text>
        );
    }
  };

  switch (infor?.actCode) {
    case ORDER_STATUS_ACT_CODE.CANCEL_ORDER:
      return (
        <View style={styles.container}>
          <View style={styles.wrapOrderId}>
            <OrderIdIcon />
            <View style={styles.wrapOrderStatus}>
              <Text>&nbsp;&nbsp;{renderStatus()}</Text>
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
              &nbsp;&nbsp;{i18n.t('orders.dealId', {id: dealData?.code})}
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
