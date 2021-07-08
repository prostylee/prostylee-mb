import styles from './styles';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, FlatList, Animated, Text} from 'react-native';
import i18n from 'i18n';
import Product from './Item';
import EmptyCart from '../EmptyCart';
import CardFooter from '../CardFooter';
import CardAddress from '../CardAddress';
import {CartEmpty, DeliveryIcon, DownIcon, RightIcon} from 'svg/common';
import {currencyFormat} from 'utils/currency';
import isEmpty from 'lodash/isEmpty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CURRENCY_VIET_NAM} from 'constants';
import {
  getListCartSelector,
  getPaymentMethodSelector,
  getShippingMethodSelector,
  getVoucherUseSelector,
} from 'redux/selectors/cart';
import {cartActions} from 'reducers';

const ListProduct = ({navigation, data, validateButton}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [total, setTotal] = useState(0);
  const [productVarientPriceData, setProductVarientPriceData] = useState({});

  const cart = useSelector((state) => getListCartSelector(state)) || [];
  const paymentSelected = useSelector((state) =>
    getPaymentMethodSelector(state),
  );
  const deliveryMethod =
    useSelector((state) => getShippingMethodSelector(state)) || {};
  const voucherUsed = useSelector((state) => getVoucherUseSelector(state));

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    const processProductPriceData = (data) => {
      const attributeList = {};
      data?.map((item) => {
        const attributeValues = item.productAttributes
          .map((attribute) => attribute.attrValue)
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
    const getProductVarient = (choiceSelect) => {
      const choiceList = choiceSelect
        .map((item) => item.value.attrValue)
        .sort();
      let attributeID = '';
      choiceList.forEach((element) => {
        attributeID = attributeID + '_' + element;
      });
      return attributeID;
    };
    const getProductChoicePrice = (productVarient, priceList) => {
      if (priceList[productVarient]) {
        return priceList[productVarient];
      } else {
        return 0;
      }
    };

    if (cart.length) {
      let sum = 0;
      let productPriceVarient = {};
      cart.forEach(function (c, index) {
        const productVarient = getProductVarient(c.options);
        const productPriceData = processProductPriceData(
          c.item.productPriceResponseList,
        );
        const productPrice = getProductChoicePrice(
          productVarient,
          productPriceData,
        );
        productPriceVarient[`${c.item.id}${productVarient}`] = productPrice;
        if (productPrice.priceSale) {
          sum += productPrice.priceSale * c.quantity;
        } else {
          sum += productPrice.price * c.quantity;
        }
      });
      setTotal(sum);
      setProductVarientPriceData(productPriceVarient);
    }
  }, [JSON.stringify(cart)]);

  useEffect(() => {
    handleRefreshing(false);
  }, [refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {};

  const renderFooter = () => {
    const voucherValue =
      voucherUsed && voucherUsed.price ? voucherUsed.price : 0;
    const deliveryValue =
      deliveryMethod && deliveryMethod.price ? deliveryMethod.price : 0;
    return (
      <>
        <View style={styles.wrapAccordion}>
          <TouchableOpacity
            style={styles.buttonCollapseHeader}
            onPress={() => {
              navigation.navigate('CartSelectShippingMethod');
            }}>
            <View style={styles.wrapCollapseHeader}>
              <View style={styles.wrapCollapseHeaderLabel}>
                <DeliveryIcon />
                <Text style={styles.titleCollapseHeader}>
                  &nbsp;{i18n.t('cart.deliveryMethod')}
                </Text>
              </View>

              <View style={styles.wrapCollapseHeaderIcon}>
                {collapsed ? <DownIcon /> : <RightIcon />}
              </View>
            </View>
          </TouchableOpacity>
          {!isEmpty(deliveryMethod) && (
            <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
              {renderDeliveryChosen(deliveryMethod)}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.wrapTotal}>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>{i18n.t('cart.total')}</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(+total, CURRENCY_VIET_NAM)}
              </Text>
            </View>
          </View>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>
                {i18n.t('cart.deliveryFee')}
              </Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(deliveryValue, CURRENCY_VIET_NAM)}
              </Text>
            </View>
          </View>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>{i18n.t('cart.coupon')}</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(voucherValue, CURRENCY_VIET_NAM)}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderDeliveryChosen = (item) => {
    return (
      <View style={styles.wrapDeliveryChosen}>
        <View style={styles.wrapInfoChosen}>
          <View>
            <View style={styles.wrapTitleChosen}>
              <Text style={styles.titleChosen}>{item.description}</Text>
            </View>
          </View>
          <View>
            <View style={styles.wrapContentChosen}>
              <Text style={styles.contentChosen}>{item.deliveryTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapPriceChosen}>
          <Text style={styles.priceRadioChosen}>
            {item.price
              ? currencyFormat(item.price, CURRENCY_VIET_NAM)
              : i18n.t('cart.freeShip')}
          </Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return <CardAddress navigation={navigation} />;
  };

  const totalPrice = () => {
    const deliveryPrice =
      deliveryMethod && deliveryMethod.price ? deliveryMethod.price : 0;
    const voucherPrice =
      voucherUsed && voucherUsed.price ? voucherUsed.price : 0;
    return +total + deliveryPrice + voucherPrice;
  };

  const onPayment = () => {
    dispatch(
      cartActions.createOrder({
        productVarientPriceData,
        totalMoney: totalPrice(),
        paymentTypeId: paymentSelected,
        shippingProviderId: deliveryMethod?.id,
      }),
    );
    // navigation.navigate('Home');
  };

  /* Extract note */
  const groupDataByStore = (list) => {
    return list.reduce((acc, product) => {
      const {item} = product;
      const {storeId, productOwnerResponse} = item;
      const foundIndex = acc.findIndex(
        (element) => element.storeId === storeId,
      );
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            storeId: storeId,
            storeName: productOwnerResponse.name,
            storeAvatar: productOwnerResponse.logoUrl,
            data: [product],
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, product];
      return acc;
    }, []);
  };

  const groupData = useMemo(
    () => groupDataByStore(cart),
    [JSON.stringify(cart)],
  );

  return (
    <View style={styles.container}>
      {Object.keys(groupData).length > 0 ? (
        <>
          <View style={styles.wrapList}>
            <View style={styles.wrapBody}>
              <FlatList
                data={groupData}
                ListHeaderComponent={renderHeader()}
                renderItem={({item}) => (
                  <Product navigation={navigation} product={item} />
                )}
                numColumns={1}
                keyExtractor={(item, index) => index}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={() => handleLoadMore()}
                ListFooterComponent={renderFooter}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollEvent}
                contentContainerStyle={styles.listInner}
              />
            </View>
          </View>
          <View style={styles.wrapFooter}>
            <CardFooter
              buttonText={i18n.t('cart.order')}
              deliveryMethod={deliveryMethod}
              actionButton={onPayment}
              isCheckout
              disabled={validateButton}
              totalPrice={totalPrice()}
            />
          </View>
        </>
      ) : (
        <EmptyCart
          icon={<CartEmpty />}
          title={i18n.t('cart.notfound')}
          subTitle={i18n.t('cart.subNotFound')}
          buttonText={i18n.t('cart.shoppingNow')}
        />
      )}
    </View>
  );
};

ListProduct.defaultProps = {};

ListProduct.propTypes = {};

export default ListProduct;
