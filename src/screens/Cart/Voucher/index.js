import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';
import {ThemeView, Header} from 'components';
import ListVoucher from './ListVoucher';

const Voucher = ({navigation, data, route}) => {
  const {params} = route;
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.coupon')} />
      <View style={styles.wrapContent}>
        <ListVoucher navigation={navigation} params={params} />
      </View>
    </ThemeView>
  );
};

Voucher.defaultProps = {
  data: [],
};

Voucher.propTypes = {};

export default Voucher;
