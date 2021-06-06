import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import TabOrders from './TabOrders';

const Orders = ({navigation, route: {params}}) => {
  const {status} = params;
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('orders.title')} />
      <View style={styles.wrapContent}>
        <TabOrders status={status}/>
      </View>
    </ThemeView>
  );
};

Orders.defaultProps = {};

Orders.propTypes = {};

export default Orders;
