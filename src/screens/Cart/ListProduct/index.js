import styles from './styles';
import React, {useRef, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {View, FlatList, Animated, Text} from 'react-native';
import Product from './Item';
import EmptyCart from '../EmptyCart';
import CardFooter from '../CardFooter';
import ProductSimilar from '../ProductSimilar';
import ProductSuggestion from '../ProductSuggestion';
import i18n from 'i18n';

import {
  getListCartSelector,
  getSuggestionLoadingSelector,
  getRecentLoadingSelector,
} from 'redux/selectors/cart';
import {cartActions} from 'reducers';

import {CartEmpty} from 'svg/common';

const ListProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);
  const [total, setTotal] = useState(0);

  const cart = useSelector((state) => getListCartSelector(state)) || [];
  const isSuggestionLoading =
    useSelector((state) => getSuggestionLoadingSelector(state)) || false;
  const isRecentLoading =
    useSelector((state) => getRecentLoadingSelector(state)) || false;

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const handleRefresh = () => {
    handleRefreshing(true);
    dispatch(cartActions.getListRecent());
    dispatch(cartActions.getListSuggestion());
  };

  const RenderFooter = () => {
    return (
      <>
        <View style={styles.wrapMore}>
          <Text style={styles.textMore}>{i18n.t('cart.more')}</Text>
        </View>
        <View style={styles.wrapProductSimilar}>
          <ProductSimilar />
        </View>
        <View style={styles.wrapProductSuggestion}>
          <ProductSuggestion />
        </View>
        <View style={styles.viewLoadingFooter} />
      </>
    );
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

  const onCheckout = () => {
    navigation.navigate('CheckoutCart');
  };
  useEffect(() => {
    if (!isSuggestionLoading && !isRecentLoading) {
      handleRefreshing(false);
    }
  }, [isSuggestionLoading, isRecentLoading]);

  useEffect(() => {
    dispatch(cartActions.getListRecent());
    dispatch(cartActions.getListSuggestion());
    dispatch(cartActions.getListDelivery());
  }, []);

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
    }
  }, [JSON.stringify(cart)]);

  return (
    <View style={styles.container}>
      {Object.keys(groupData).length > 0 ? (
        <>
          <View style={styles.wrapList}>
            <View style={styles.wrapBody}>
              <FlatList
                data={groupData}
                renderItem={({item}) => (
                  <Product navigation={navigation} product={item} />
                )}
                numColumns={1}
                keyExtractor={(item, index) => `${item.storeId}_${index}`}
                ListFooterComponent={<RenderFooter />}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollEvent}
                refreshing={refreshing}
                onRefresh={() => handleRefresh()}
              />
            </View>
          </View>
          <View style={styles.wrapFooter}>
            <CardFooter
              navigation={navigation}
              actionButton={onCheckout}
              totalPrice={total}
              buttonText={i18n.t('cart.payment')}
              disabled={false}
            />
          </View>
        </>
      ) : (
        <EmptyCart
          navigation={navigation}
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
