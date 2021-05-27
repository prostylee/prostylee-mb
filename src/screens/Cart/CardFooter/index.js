/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {View, Text} from 'react-native';
import {ButtonRounded} from 'components';
import {Button} from 'react-native-paper';
import {CartEmpty, CreditSvg, CouponSvg, RightArrow} from 'svg/common';

const CardFooter = ({
  navigation,
  title,
  subTitle,
  buttonText,
  actionButton,
  icon,
}) => {
  const handlePress = () => {
    if (typeof actionButton === 'function') {
      actionButton();
      return;
    }
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewCredit}>
          <Button
            mode="text"
            style={styles.btnCredit}
            onPress={() => console.log('Pressed')}>
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
            onPress={() => console.log('Pressed')}>
            <View style={styles.labelCoupon}>
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
          <ButtonRounded onPress={handlePress} style={styles.btnCheckout} label="Thanh toán" />
        </View>
      </View>
    </View>
  );
};

CardFooter.defaultProps = {};

CardFooter.propTypes = {};

export default CardFooter;
