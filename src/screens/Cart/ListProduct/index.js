/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useRef, useEffect, useMemo, useState} from 'react';
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

import {useDispatch} from 'react-redux';

const ListProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);

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
    console.log('REFRSH');
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
        <View style={styles.viewLoadingFooter}></View>
      </>
    );
  };

  /* Extract note */
  const groupDataByStore = (list) => {
    return list.reduce((acc, product) => {
      const {item, quantity, options} = product;
      const {storeId, productOwnerResponse, id} = item;
      const foundIndex = acc.findIndex((element) => element.key === storeId);
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: storeId,
            storeName: productOwnerResponse.name,
            storeAvatar: productOwnerResponse.logoUrl,
            id: id,
            data: [item],
            amount: quantity,
            options: options,
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, item];
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
    if (!isSuggestionLoading && !isRecentLoading) handleRefreshing(false);
  }, [isSuggestionLoading, isRecentLoading]);

  useEffect(() => {
    dispatch(cartActions.getListRecent());
    dispatch(cartActions.getListSuggestion());
  }, []);
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
                keyExtractor={(item, index) => index}
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
              buttonText={i18n.t('cart.payment')}
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
