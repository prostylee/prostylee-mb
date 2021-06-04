import styles from './styles';
import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import {VISAIcon, MASTERIcon, AEIcon, DISCOVERIcon, MomoIcon} from 'svg/common';
import {ThemeView, Header} from 'components';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {cartActions} from 'reducers';

import {
  getListPaymentSelector,
  getPaymentLoadingSelector,
  getPaymentUseSelector,
} from 'redux/selectors/cart';

const PaymentMethod = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [value, setValue] = useState();

  const loading = useSelector((state) => getPaymentLoadingSelector(state));
  const paymentList = useSelector((state) => getListPaymentSelector(state));
  const paymentUsed = useSelector((state) => getPaymentUseSelector(state));

  useEffect(() => {
    dispatch(cartActions.getListPayment());
  }, []);

  useEffect(() => {
    setValue(paymentUsed);
  }, [paymentUsed]);

  const onChange = (vl) => {
    setValue(vl);
    dispatch(cartActions.setPaymentUse(vl));
    navigation.goBack();
  };

  const renderLabel = (item) => {
    switch (item.name) {
      case 'credit':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.name}</Text>
            </View>
            <View style={styles.wrapRadioSub}>
              <View style={styles.iconRadioSub}>
                <VISAIcon />
              </View>
              <View style={styles.iconRadioSub}>
                <MASTERIcon />
              </View>
              <View style={styles.iconRadioSub}>
                <AEIcon />
              </View>
              <View style={styles.iconRadioSub}>
                <DISCOVERIcon />
              </View>
            </View>
          </View>
        );
      case 'momo':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.name}</Text>
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
              <Text style={styles.titleRadio}>{item.name}</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.name}</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.paymentMethod')} />
      <View style={styles.wrapContent}>
        <RadioButton.Group
          onValueChange={onChange}
          value={value}
          color="#823ffd"
          style={styles.wrapRadioGroup}>
          {paymentList?.length > 0 &&
            paymentList.map((item) => (
              <RadioButton.Item
                key={item.id}
                label={renderLabel(item)}
                value={item.id}
                color="#823ffd"
                style={styles.wrapRadioButton}
              />
            ))}
        </RadioButton.Group>
      </View>
    </ThemeView>
  );
};

PaymentMethod.defaultProps = {
  data: [],
};

PaymentMethod.propTypes = {};

export default PaymentMethod;
