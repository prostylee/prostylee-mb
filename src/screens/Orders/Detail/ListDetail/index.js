import styles from './styles';
import React, {useRef, useMemo} from 'react';
import {FlatList, Text, Animated, View} from 'react-native';
import i18n from 'i18n';
import {
  Info,
  Tracking,
  UserInfo,
  Payment,
  Delivery,
  Summary,
  Footer,
} from '../CardDetail';
import StoreItem from '../../StoreItem';
import {currencyFormat} from 'utils/currency';
import {OrderDetailsLoading} from 'components/Loading/contentLoader';
import {ORDER_STATUS_ACT_CODE, CURRENCY_VIET_NAM} from 'constants';
const ListDetail = ({
  navigation,
  dealData,
  orderData = {},
  onRefresh = () => {},
  loading = false,
}) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
  /* Extract note */
  const groupDataByStore = (list = []) => {
    return list.reduce((arrayStore, product) => {
      let store = product?.store;
      let idx = arrayStore.findIndex((item) => item.id === store.id);
      if (idx === -1) {
        return [
          ...arrayStore,
          {
            ...store,
            products: [product],
          },
        ];
      }
      arrayStore[idx].products = [...arrayStore[idx].products, product];
      return arrayStore;
    }, []);
  };

  const groupData = useMemo(
    () => groupDataByStore(orderData.orderDetails),
    [JSON.stringify(orderData.orderDetails)],
  );
  const getTotalDiscount = (listVouchers = []) => {
    return listVouchers.reduce((total, item) => (total += item?.amount), 0);
  };
  const _handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
  };

  React.useEffect(() => {
    if (!loading) {
      setIsRefreshing(false);
    }
  }, [loading]);
  const renderHeader = () => {
    return (
      <>
        <View style={styles.wrapItem}>
          <Info dealData={orderData} />
        </View>
        {orderData?.orderHistory?.[
          orderData.orderHistory?.length
            ? orderData.orderHistory?.length - 1
            : 0
        ]?.actCode !== ORDER_STATUS_ACT_CODE.CANCEL_ORDER ? (
          <View style={[styles.wrapItem, styles.paddingBottomNone]}>
            <Tracking
              timeLine={orderData?.orderHistory}
              status={orderData?.statusId}
            />
          </View>
        ) : null}

        <View style={styles.wrapItem}>
          <UserInfo infor={orderData?.shippingAddress} />
        </View>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <View style={{...styles.wrapItem}}>
          {renderFooterProduct(orderData?.orderDetails, orderData?.totalMoney)}
        </View>
        <View style={[styles.wrapItem, styles.marginTop10]}>
          <Payment paymentType={orderData?.paymentType} />
        </View>
        <View style={styles.wrapItem}>
          <Delivery shippingProvider={orderData?.shippingProvider} />
        </View>
        <View style={styles.wrapItem}>
          <Summary
            totalMoney={orderData?.totalMoney}
            shippingFee={orderData?.shippingProvider?.price}
            totalDiscount={getTotalDiscount(orderData?.orderDiscounts)}
          />
        </View>
        <View style={styles.wrapItemFooter}>
          <Footer dealData={orderData} />
        </View>
      </>
    );
  };

  const renderFooterProduct = (list = [], totalPrice = 0) => {
    const totalItem = list?.reduce((total, item) => {
      return (total += item?.amount);
    }, 0);
    return (
      <View style={styles.wrapFooterItem}>
        <View style={styles.colCountFooter}>
          <Text style={styles.labelCountFooter}>
            {i18n.t('orders.countProduct', {count: totalItem})}
          </Text>
        </View>
        <View style={styles.colTotalFooter}>
          <Text style={styles.labelTotalFooter}>
            {currencyFormat(totalPrice, CURRENCY_VIET_NAM)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && !isRefreshing ? (
        <>
          <View style={styles.padding16}>
            <OrderDetailsLoading />
          </View>
          <View style={styles.padding16}>
            <OrderDetailsLoading />
          </View>
          <View style={styles.padding16}>
            <OrderDetailsLoading />
          </View>
        </>
      ) : (
        <FlatList
          data={groupData}
          renderItem={({item}) => (
            <StoreItem navigation={navigation} product={item} store={item} />
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollEvent}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter}
          refreshing={isRefreshing}
          onRefresh={_handleRefresh}
        />
      )}
    </View>
  );
};

ListDetail.defaultProps = {
  dealData: {},
};

ListDetail.propTypes = {};

export default ListDetail;
