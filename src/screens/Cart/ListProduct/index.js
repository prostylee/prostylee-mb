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
