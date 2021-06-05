/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {ButtonRounded} from 'components';
import {Button, Chip} from 'react-native-paper';
import {CreditSvg, CouponSvg, RightArrow} from 'svg/common';
import {useNavigation} from '@react-navigation/native';
import {currencyFormat} from 'utils/currency';
import {cartActions} from 'redux/reducers';
import {
  getVoucherUseSelector,
  getPaymentUseSelector,
  getListPaymentSelector,
  getListCartSelector,
} from 'redux/selectors/cart';

const CardFooter = ({buttonText, actionButton}) => {
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const voucherUsed = useSelector((state) => getVoucherUseSelector(state));
  const paymentUsed = useSelector((state) => getPaymentUseSelector(state));
  const paymentList = useSelector((state) => getListPaymentSelector(state));
  const cart = useSelector((state) => getListCartSelector(state)) || [];

  useEffect(() => {
    if (cart.length) {
      let sum = 0;
      cart.forEach(function (c, index) {
        sum += c.item.priceSale * c.quantity;
      });
      setTotal(sum);
    }
  }, [JSON.stringify(cart)]);

  const handlePress = () => {
    if (typeof actionButton === 'function') {
      actionButton();
      return;
    }
  };

  const onRemoveCoupon = () => {
    dispatch(cartActions.setVoucherUse(null));
  };
  const payment = paymentList.filter((item) => item.id === paymentUsed);
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewCredit}>
          <Button
            mode="text"
            style={styles.btnCredit}
            onPress={() => navigation.navigate('PaymentMethodCart')}>
            <View style={styles.labelCredit}>
              <CreditSvg />
              <Text>
                &nbsp;
                {paymentUsed ? payment[0].name : 'Credit card'}&nbsp;
              </Text>

              <RightArrow />
            </View>
          </Button>
        </View>
        <View style={styles.viewCoupon}>
          <Button
            mode="text"
            style={styles.btnCoupon}
            onPress={() => navigation.navigate('VoucherCart')}>
            <View style={styles.labelCoupon}>
              {voucherUsed ? (
                <>
                  <CouponSvg />
                  <Chip
                    onPress={() => navigation.navigate('VoucherCart')}
                    style={styles.wrapChip}
                    onClose={onRemoveCoupon}>
                    <Text style={styles.chipText}>&nbsp;{voucherUsed.key}</Text>
                  </Chip>
                </>
              ) : (
                <>
                  <CouponSvg />
                  <Text>&nbsp;Mã giảm giá</Text>
                </>
              )}
            </View>
          </Button>
        </View>
      </View>
      <View style={styles.viewBody}>
        <View style={styles.viewTemp}>
          <Text style={styles.viewTempTitle}>Tạm tính</Text>
          <Text style={styles.viewTempValue}>
            {currencyFormat(+total, 'đ')}
          </Text>
        </View>
        <View style={styles.viewCheckout}>
          <ButtonRounded
            onPress={handlePress}
            compact={false}
            style={styles.btnCheckout}
            label={buttonText}
          />
        </View>
      </View>
    </View>
  );
};

CardFooter.defaultProps = {
  buttonText: 'Thanh toán',
};

CardFooter.propTypes = {};

export default CardFooter;
