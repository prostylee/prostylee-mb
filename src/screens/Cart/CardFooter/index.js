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
  getPaymentMethodSelector,
} from 'redux/selectors/cart';
import {showMessage} from 'react-native-flash-message';

const CardFooter = ({
  buttonText,
  deliveryMethod,
  actionButton,
  isCheckout = false,
  disabled = true,
  totalPrice = 0,
}) => {
  const [voucher, setVoucher] = useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => getListPaymentSelector(state));
  const paymentSelected = useSelector((state) =>
    getPaymentMethodSelector(state),
  );

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
    if (
      disabled ||
      (isCheckout ? !paymentSelected || isEmpty(deliveryMethod) : false)
    ) {
      showMessage({
        message: i18n.t('cart.choosePaymentOption'),
        type: 'danger',
        position: 'top',
        duration: 5000,
      });
      return;
    }
    navigation.navigate('VoucherCart', {
      onUseVoucher: (item) => setVoucher(item),
      totalPrice: totalPrice,
    });
  };

  const onChangePayment = () => {
    navigation.navigate('PaymentMethodCart');
  };

  const paymentUsed = paymentList.filter((item) => item.id === paymentSelected);

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
            {currencyFormat(totalPrice, 'đ')}
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
