import styles from './styles';
import React from 'react';
import {Text, View} from 'react-native';
import {OrderIdIcon} from 'svg/common';
import moment from 'moment';

import i18n from 'i18n';

import {ORDER_STATUS} from 'constants';

const OrderInfo = ({dealData = {}}) => {
  const renderStatus = () => {
    switch (dealData?.status) {
      case ORDER_STATUS.PROCESSING:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#823FFD'}}>
            {'Đang xử lý'}
          </Text>
        );
      case ORDER_STATUS.ON_DELIVERY:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#F48231'}}>
            {'Đang vận chuyển'}
          </Text>
        );
      case ORDER_STATUS.COMPLETED:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#3FBA44'}}>
            {'Đã giao'}
          </Text>
        );
      case ORDER_STATUS.CANCEL_ORDER:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {'Đã huỷ'}
          </Text>
        );
      case ORDER_STATUS.WAIT_FOR_PAYMENT:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#ED2727'}}>
            {'Chờ thanh toán'}
          </Text>
        );

      default:
        return (
          <Text style={{...styles.labelOrderStatus, color: '#333333'}}>
            {'Không xác định'}
          </Text>
        );
    }
  };

  switch (dealData?.status) {
    case ORDER_STATUS.CANCEL_ORDER:
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
                date: moment(dealData.createdAt).format('HH:mm DD-MM-YYYY'),
              })}
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
