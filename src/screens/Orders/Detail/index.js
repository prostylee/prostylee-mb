import styles from './styles';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import ListDetail from './ListDetail';
import {getOrderDetails} from '../../../services/api/myPageApi';
import {ActivityIndicator} from 'react-native-paper';
import {OrderDetailsLoading} from 'components/Loading/contentLoader';

const OrderDetail = ({navigation, route: {params}}) => {
  const [loading, setLoading] = useState(false);
  const [orderDetailsData, setOrderDetailsData] = useState({});
  const {orderId} = params;

  console.log('RERENDER');
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetails(orderId);
      setOrderDetailsData(res?.data?.data);
    } catch (err) {
      console.log('GET ORDER DETAILS ERROR', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading) {
      console.log('CALL API');
      fetchOrderDetails();
    }
  }, []);
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title="Chi tiết đơn hàng" />
      {loading ? (
        <>
          <View style={{padding: 16}}>
            <OrderDetailsLoading />
          </View>
          <View style={{padding: 16}}>
            <OrderDetailsLoading />
          </View>
          <View style={{padding: 16}}>
            <OrderDetailsLoading />
          </View>
        </>
      ) : (
        <View style={styles.wrapContent}>
          <ListDetail dealData={params} orderData={orderDetailsData} />
        </View>
      )}
    </ThemeView>
  );
};

OrderDetail.defaultProps = {};

OrderDetail.propTypes = {};

export default OrderDetail;
