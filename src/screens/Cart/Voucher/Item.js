/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Text, View} from 'react-native';
import {Image} from 'components';
import CardVoucher from '../CardVoucher';
import {Button} from 'react-native-paper';
import i18n from 'i18n';
import {cartActions} from 'redux/reducers';
import {getVoucherUseSelector} from 'redux/selectors/cart';
import {checkVoucher} from 'services/api/cartApi';
import {showMessage} from 'react-native-flash-message';

const ProductItem = ({item, navigation}) => {
  const dispatch = useDispatch();

  const voucherUsed = useSelector((state) => getVoucherUseSelector(state));

  const onUse = async () => {
    if (!voucherUsed || voucherUsed.id !== item.id) {
      const body = {
        code: 'string',
        totalMoney: 0,
        status: 'AWAITING_CONFIRMATION',
        paymentTypeId: 0,
        buyerId: 0,
        shippingAddress: {
          fullName: 'string',
          email: 'string',
          phoneNumber: 'string',
          address1: 'string',
          address2: 'string',
          state: 'string',
          city: 'string',
          country: 'string',
          zipcode: 'string',
        },
        shippingProviderId: 0,
        orderDetails: [
          {
            storeId: 0,
            branchId: 0,
            productId: 0,
            productPrice: 0,
            amount: 0,
            productName: 'string',
            productImage: 'string',
            productColor: 'string',
            productSize: 'string',
            productData: 'string',
          },
        ],
        orderDiscounts: [
          {
            voucherId: 0,
            amount: 0,
            description: 'string',
          },
        ],
      };
      checkVoucher(body)
        .then((res) => {
          if (res.data.status !== 200) {
            showMessage({
              message: `Có lỗi xảy ra, vui lòng thử lại sau`,
              type: 'danger',
            });
            return;
          }
          showMessage({
            message: `Sử dụng mã giảm giá thành công`,
            type: 'success',
          });
        })
        .then(() => {
          showMessage({
            message: `Lỗi hệ thống!`,
            type: 'danger',
          });
        });
      await dispatch(cartActions.setVoucherUse(item));
    }
    navigation.goBack();
  };

  return (
    <CardVoucher style={styles.cardItem} key={item.key}>
      <View style={styles.wrapCardItem}>
        <View style={styles.wrapContentVoucher}>
          <View>
            <Image
              source={
                item?.logo
                  ? {uri: item?.logo}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.wrapInfo}>
            <Text numberOfLines={1} style={styles.textCategory}>
              {item.voucherOwner}
            </Text>
            <Text numberOfLines={2} style={styles.textDescription}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={styles.dashedLine}></View>
        <View style={styles.wrapExpiredVoucher}>
          <View style={styles.wrapExpiredText}>
            <Text numberOfLines={1} style={styles.textExpired}>{`HSD: ${
              item.expiryDate ? item.expiryDate : 'Không có'
            }`}</Text>
          </View>
          <View>
            <Button
              contentStyle={styles.button}
              labelStyle={styles.labelStyle}
              mode="contained"
              color="#823FFD"
              onPress={onUse}>
              {i18n.t('cart.use')}
            </Button>
          </View>
        </View>
      </View>
    </CardVoucher>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
