/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {View, Text} from 'react-native';
import {ButtonRounded} from 'components';
import {Button, Chip} from 'react-native-paper';
import {CreditSvg, CouponSvg, RightArrow} from 'svg/common';
import {useNavigation} from '@react-navigation/native';

const CardFooter = ({buttonText, actionButton}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (typeof actionButton === 'function') {
      actionButton();
      return;
    }
  };

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
              <Text> &nbsp;Credit card&nbsp;</Text>
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
              {/* <Chip
                icon="information"
                onPress={() => console.log('Pressed')}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  margin: 4,
                }}
                onClose={() => console.log('closed')}>
                Example Chip
              </Chip> */}

              <CouponSvg />
              <Text>&nbsp;Mã giảm giá</Text>
            </View>
          </Button>
        </View>
      </View>
      <View style={styles.viewBody}>
        <View style={styles.viewTemp}>
          <Text style={styles.viewTempTitle}>Tạm tính</Text>
          <Text style={styles.viewTempValue}>999999</Text>
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
