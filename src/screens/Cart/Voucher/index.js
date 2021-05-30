import styles from './styles';
import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import {VISAIcon, MASTERIcon, AEIcon, DISCOVERIcon, MomoIcon} from 'svg/common';
import {ThemeView, Header} from 'components';
import ListVoucher from './ListVoucher';

const payments = [
  {label: 'Credit Card', value: 'credit'},
  {label: 'Momo', value: 'momo'},
  {label: 'COD', value: 'cod'},
];

const PaymentMethod = ({navigation, data}) => {
  const [value, setValue] = useState();

  const renderLabel = (item) => {
    switch (item.value) {
      case 'credit':
        return (
          <CardVoucher>
            <Text style={styles.titleRadio}>{item.label}</Text>
          </CardVoucher>
        );
      case 'momo':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
            <View style={styles.wrapRadioSub}>
              <View style={styles.iconRadioSub}>
                <MomoIcon />
              </View>
            </View>
          </View>
        );
      case 'cod':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
        );
    }
  };

  const onChange = (vl) => {
    setValue(vl);
  };

  const listPayment = useMemo(() => payments, [JSON.stringify(payments)]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.coupon')} />
      <View style={styles.wrapContent}>
        <ListVoucher />
      </View>
    </ThemeView>
  );
};

PaymentMethod.defaultProps = {
  data: [],
};

PaymentMethod.propTypes = {};

export default PaymentMethod;
