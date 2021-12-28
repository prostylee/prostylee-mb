import styles from './styles';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Text, View} from 'react-native';
import {Image} from 'components';
import {SUCCESS} from 'constants';
import CardVoucher from '../CardVoucher';
import {Button} from 'react-native-paper';
import i18n from 'i18n';
import {getProductVarient} from 'utils/product';
import {cartActions, userSelectors} from 'reducers';
import {TicketCutLine} from 'svg/common';
import {verifyVoucher} from 'services/api/cartApi';
import {showMessage} from 'react-native-flash-message';
import {
  getListCartSelector,
  getPaymentMethodSelector,
  getShippingMethodSelector,
  getSelectedCartAddressSelector,
} from 'redux/selectors/cart';

const ProductItem = ({item, navigation, params}) => {
  const dispatch = useDispatch();

  const processProductPriceData = (data) => {
    const attributeList = {};
    data?.map((item) => {
      const attributeValues = item.productAttributes
        .map(
          (attribute) => attribute?.productAttributeResponses?.[0]?.attrValue,
        )
        .sort();
      let attributeID = '';
      attributeValues.forEach((element) => {
        attributeID = attributeID + '_' + element;
      });
      attributeList[attributeID] = {
        price: item?.price,
        priceSale: item?.priceSale,
      };
    });
    return attributeList;
  };
  const getProductChoicePrice = (productVarient, priceList) => {
    if (priceList[productVarient]) {
      return priceList[productVarient];
    } else {
      return 0;
    }
  };
  const getProductPrice = (data, quantity) => {
    if (data.priceSale) {
      return data.priceSale * quantity;
    } else {
      return data.price * quantity;
    }
  };

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const paymentSelected = useSelector((state) =>
    getPaymentMethodSelector(state),
  );
  const deliveryMethod =
    useSelector((state) => getShippingMethodSelector(state)) || {};
  const selectedCartAddress = useSelector((state) =>
    getSelectedCartAddressSelector(state),
  );
  const cart = useSelector((state) => getListCartSelector(state)) || [];
  const cartData = cart.length
    ? cart.map((cartItem) => {
        const productVarient = getProductVarient(cartItem.options);
        const productPriceData = processProductPriceData(
          cartItem.item.productPriceResponseList,
        );
        const productPrice = getProductChoicePrice(
          productVarient,
          productPriceData,
        );
        return {
          productId: cartItem.item.id,
          quantity: cartItem.quantity,
          amount: getProductPrice(productPrice, cartItem.quantity),
        };
      })
    : [];

  const onUse = async () => {
    const body = {
      voucherId: item.id,
      order: {
        amount: params?.totalPrice ? params.totalPrice : 0,
        shippingProviderId: deliveryMethod.id,
        shippingMethodId: deliveryMethod.id,
        shippingAddress: {
          state: selectedCartAddress.districtCode,
          city: selectedCartAddress.cityCode,
          country: null,
          zipcode: null,
        },
        paymentTypeId: paymentSelected,
        buyerId: userProfile.id,
        buyAt: 2,
      },
      orderDetails: cartData,
    };

    verifyVoucher(body)
      .then(async (res) => {
        if (res.data.status === SUCCESS) {
          if (res.data.data.data) {
            showMessage({
              message: i18n.t('cart.addVoucherSuccess'),
              type: 'success',
              position: 'top',
            });
            await dispatch(cartActions.setVoucherUse(item));
            navigation.goBack();
          } else {
            showMessage({
              message: i18n.t('cart.addVoucherFail'),
              type: 'danger',
              position: 'top',
            });
          }
        } else {
          showMessage({
            message: i18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
        }
      })
      .catch(() => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
    return;
  };

  return (
    <CardVoucher style={styles.cardItem} key={item.key}>
      <View style={styles.wrapCardItem}>
        <View style={styles.wrapContentVoucher}>
          <View>
            <Image
              source={
                item?.storeOwner?.logoUrl
                  ? {uri: item?.storeOwner?.logoUrl}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.wrapInfo}>
            <Text numberOfLines={1} style={styles.textCategory}>
              {item?.storeOwner?.name}
            </Text>
            <Text numberOfLines={2} style={styles.textDescription}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <TicketCutLine />
        </View>
        <View style={styles.wrapExpiredVoucher}>
          <View style={styles.wrapExpiredText}>
            <Text numberOfLines={1} style={styles.textExpired}>{`HSD: ${
              item.cndValidTo ? item.cndValidTo : 'Không có'
            }`}</Text>
          </View>
          <View>
            <Button
              labelStyle={styles.labelStyle}
              contentStyle={styles.contentStyle}
              uppercase={false}
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

ProductItem.defaultProps = {params: {}};

ProductItem.propTypes = {};

export default ProductItem;
