/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {View, ActivityIndicator, FlatList, Animated, Text} from 'react-native';
import i18n from 'i18n';
import {Colors} from 'components';
import Product from './Item';
import EmptyCart from '../EmptyCart';
import CardFooter from '../CardFooter';
import CardAddress from '../CardAddress';
import {CartEmpty, DeliveryIcon, DownIcon, RightIcon} from 'svg/common';
import {currencyFormat} from 'utils/currency';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {getListCartSelector} from 'redux/selectors/cart';

const deliveries = [
  {label: 'Grab', content: 'Nhận hàng vào 29-12 đến 31-12', value: 25000},
  {label: 'Viettel Post', content: 'Nhận hàng trong ngày', value: 45000},
  {label: 'VN Express', content: 'Nhận hàng trong ngày', value: 35000},
  {label: 'Giao hàng tiết kiệm', content: 'Nhận hàng trong ngày', value: 30000},
  {
    label: 'Tự lấy hàng',
    content: 'Bạn có thể tự đến lấy hàng tại địa chỉ của người bán.',
    value: 0,
  },
];

const ListProduct = ({navigation, data}) => {
  const [refreshing, handleRefreshing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [valueDelivery, setValueDelivery] = useState();
  const [total, setTotal] = useState(0);

  const cart = useSelector((state) => getListCartSelector(state)) || [];

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    if (cart.length) {
      let sum = 0;
      cart.forEach(function (c, index) {
        sum += c.item.price * c.quantity;
      });
      setTotal(sum);
    }
  }, [JSON.stringify(cart)]);

  useEffect(() => {
    handleRefreshing(false);
  }, [refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {};

  const onChangeDelivery = (vl) => {
    setValueDelivery(vl);
    setCollapsed(true);
  };

  const renderFooter = () => {
    return (
      <>
        <View style={styles.wrapAccordion}>
          <TouchableOpacity
            style={styles.buttonCollapseHeader}
            onPress={() => setCollapsed(!collapsed)}>
            <View style={styles.wrapCollapseHeader}>
              <DeliveryIcon />
              <Text style={styles.titleCollapseHeader}>
                &nbsp;{i18n.t('cart.deliveryMethod')}
              </Text>
            </View>
            <View>{collapsed ? <DownIcon /> : <RightIcon />}</View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed}>
            <RadioButton.Group
              onValueChange={onChangeDelivery}
              value={valueDelivery}
              color="#823ffd"
              style={styles.wrapRadioGroup}>
              {listDelivery?.length > 0 &&
                listDelivery.map((item) => (
                  <RadioButton.Item
                    key={item.value}
                    label={renderDelivery(item)}
                    value={item.value}
                    color="#823ffd"
                    style={styles.wrapRadioButton}
                  />
                ))}
            </RadioButton.Group>
          </Collapsible>
        </View>

        <View style={styles.wrapTotal}>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>{i18n.t('cart.total')}</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(+total, 'đ')}
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
                {currencyFormat(9999999, 'đ')}
              </Text>
            </View>
          </View>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>{i18n.t('cart.coupon')}</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(9999999, 'đ')}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      </>
    );
  };

  const renderDelivery = (item) => {
    return (
      <View style={styles.wrapRadio}>
        <View style={styles.wrapInfo}>
          <View>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
          <View style={styles.wrapPrice}>
            <Text style={styles.priceRadio}>
              {item.value
                ? currencyFormat(item.value, 'đ')
                : i18n.t('cart.freeShip')}
            </Text>
          </View>
        </View>

        <View style={styles.wrapRadioContent}>
          <Text style={styles.contentRadio}>{item.content}</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return <CardAddress />;
  };

  const onPayment = () => {
    navigation.navigate('Home');
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

  const listDelivery = useMemo(() => deliveries, [JSON.stringify(deliveries)]);

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
              />
            </View>
          </View>
          <View style={styles.wrapFooter}>
            <CardFooter
              buttonText={i18n.t('cart.order')}
              actionButton={onPayment}
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
