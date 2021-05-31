import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';
import {ThemeView, Header} from 'components';
import ListVoucher from './ListVoucher';

const Voucher = ({navigation, data}) => {
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.coupon')} />
      <View style={styles.wrapContent}>
        <ListVoucher navigation={navigation} />
      </View>
    </ThemeView>
  );
};

Voucher.defaultProps = {
  data: [],
};

Voucher.propTypes = {};

export default Voucher;
