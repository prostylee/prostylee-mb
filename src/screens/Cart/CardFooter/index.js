import styles from './styles';

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {ButtonRounded} from 'components';
import {Chip} from 'react-native-paper';
import i18n from 'i18n';
import isEmpty from 'lodash/isEmpty';
import {CreditSvg, CouponSvg, RightArrow} from 'svg/common';
import {useNavigation} from '@react-navigation/native';
import {currencyFormat} from 'utils/currency';
import {cartActions} from 'redux/reducers';
import {
  getListPaymentSelector,
  getListCartSelector,
  getPaymentMethodSelector,
} from 'redux/selectors/cart';

const CardFooter = ({
  buttonText,
  deliveryMethod,
  voucher: voucherData,
  actionButton,
  isCheckout = false,
  disabled = true,
}) => {
  const [total, setTotal] = useState(0);
  const [voucher, setVoucher] = useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => getListPaymentSelector(state));
  const cart = useSelector((state) => getListCartSelector(state)) || [];
  const paymentSelected = useSelector((state) =>
    getPaymentMethodSelector(state),
  );

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
    setVoucher(null);
  };

  const onChangeVoucher = () => {
    navigation.navigate('VoucherCart', {
      onUseVoucher: (item) => setVoucher(item),
    });
  };

  const onChangePayment = () => {
    navigation.navigate('PaymentMethodCart');
  };

  const paymentUsed = paymentList.filter((item) => item.id === paymentSelected);
  const totalPrice = () => {
    const deliveryPrice =
      deliveryMethod && deliveryMethod.price ? deliveryMethod.price : 0;
    const voucherPrice =
      voucherData && voucherData.price ? voucherData.price : 0;
    return +total + deliveryPrice + voucherPrice;
  };

  return (
    <View style={styles.container}>
      {isCheckout ? (
        <View style={styles.viewHeader}>
          <View style={styles.viewCredit}>
            <TouchableOpacity
              style={styles.btnCredit}
              onPress={onChangePayment}>
              <View style={styles.labelCredit}>
                <CreditSvg />
                <Text style={styles.paymentText}>
                  {paymentUsed.length
                    ? paymentUsed[0].name
                    : i18n.t('cart.selectPayment')}
                </Text>
                <RightArrow />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewCoupon}>
            <TouchableOpacity
              mode="text"
              style={styles.btnCoupon}
              onPress={onChangeVoucher}>
              <View style={styles.labelCoupon}>
                {voucher ? (
                  <>
                    <CouponSvg />
                    <Chip style={styles.wrapChip} onClose={onRemoveCoupon}>
                      <Text style={styles.chipText}>&nbsp;{voucher?.code}</Text>
                    </Chip>
                  </>
                ) : (
                  <>
                    <CouponSvg />
                    <Chip style={styles.wrapChip}>
                      <Text style={styles.chipText}>
                        &nbsp;&nbsp;Mã giảm giá
                      </Text>
                    </Chip>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <View style={styles.viewBody}>
        <View style={styles.viewTemp}>
          <Text style={styles.viewTempTitle}>Tạm tính</Text>
          <Text style={styles.viewTempValue}>
            {currencyFormat(totalPrice(), 'đ')}
          </Text>
        </View>
        <View style={styles.viewCheckout}>
          <ButtonRounded
            onPress={handlePress}
            compact={false}
            style={styles.btnCheckout}
            label={buttonText}
            disabled={
              disabled ||
              (isCheckout ? !paymentSelected || isEmpty(deliveryMethod) : false)
            }
          />
        </View>
      </View>
    </View>
  );
};

CardFooter.defaultProps = {};

CardFooter.propTypes = {};

export default CardFooter;
