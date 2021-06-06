import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import ListDetail from './ListDetail';

const OrderDetail = ({navigation, route: {params}}) => {
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title="Chi tiết đơn hàng" />
      <View style={styles.wrapContent}>
        <ListDetail dealData={params}/>
      </View>
    </ThemeView>
  );
};

OrderDetail.defaultProps = {};

OrderDetail.propTypes = {};

export default OrderDetail;
