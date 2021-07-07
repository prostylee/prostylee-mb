import styles from './styles';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import ListDetail from './ListDetail';
import {getOrderDetails} from '../../../services/api/myPageApi';
import {showMessage} from 'react-native-flash-message';

const OrderDetail = ({navigation, route: {params}}) => {
  const [loading, setLoading] = useState(false);
  const [orderDetailsData, setOrderDetailsData] = useState({});
  const {orderId} = params;

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetails(orderId);
      setOrderDetailsData(res?.data?.data);
    } catch (err) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading) {
      fetchOrderDetails();
    }
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('orders.orderDetail')} />
      <View style={styles.wrapContent}>
        <ListDetail
          dealData={params}
          orderData={orderDetailsData}
          onRefresh={fetchOrderDetails}
          loading={loading}
        />
      </View>
    </ThemeView>
  );
};

OrderDetail.defaultProps = {};

OrderDetail.propTypes = {};

export default OrderDetail;
