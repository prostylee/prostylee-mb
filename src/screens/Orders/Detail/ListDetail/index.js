import styles from './styles';
import React, {useRef, useMemo, useState} from 'react';
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
import {getOrderDetails} from '../../../../services/api/myPageApi';

const mockData = {
  id: 1,
  code: 'MNJH29891',
  createdAt: '12-02-2021',
  orderHistory: [
    {
      id: 1,
      statusName: 'Đang giao hàng',
      actCode: 30,
      updatedAt: '20-04-2020',
    },
    {
      id: 2,
      statusName: 'Đã tiếp nhận đơn hàng',
      actCode: 30,
      updatedAt: '10-04-2020',
    },
    {
      id: 3,
      statusName: 'Đặt hàng',
      actCode: 30,
      updatedAt: '09-04-2020',
    },
  ],
  shippingAddress: {
    id: 1,
    fullName: 'Nguyen Van A',
    phoneNumber: '0909999123',
    address1: '129A',
    address2: 'Nguyen Ba Tong',
    state: 'Tan Binh',
    city: 'Ho Chi Minh',
  },
  orderDetails: [
    {
      amount: 9,
      id: 136,
      productImage:
        'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
      productName: 'Áo thun nam cổ trụ hàn quốc 10',
      productPrice: 150000,
      orderDetailAttributes: 'XL|Đen',
      store: {
        id: 1,
        logoUrl:
          'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/90x120/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/DA571D52-3333-4BEF-BA32-3830B6EF5617.jpg',
        name: 'Store',
      },
    },
    {
      amount: 1,
      id: 137,
      productImage:
        'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
      productName: 'Hàn quốc 10',
      productPrice: 150000,
      orderDetailAttributes: 'S|Xanh',
      store: {
        id: 2,
        logoUrl:
          'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/90x120/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/DA571D52-3333-4BEF-BA32-3830B6EF5617.jpg',
        name: 'Store 2',
      },
    },
    {
      amount: 1,
      id: 137,
      productImage:
        'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
      productName: 'Hàn quốc 10',
      productPrice: 150000,
      orderDetailAttributes: 'S|Xanh',
      store: {
        id: 2,
        logoUrl:
          'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/90x120/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/DA571D52-3333-4BEF-BA32-3830B6EF5617.jpg',
        name: 'Store 2',
      },
    },
  ],
  totalMoney: 1000_000,
  paymentType: 'MOMO',
  orderDiscounts: {
    id: 1,
    voucherId: 2,
    amount: 20_000,
  },
  shippingProvider: {
    name: 'Ninja Van',
    deliveryTime: '20-12-1998',
    price: 15_000,
  },
};

const ListDetail = ({navigation, dealData, orderData = {}}) => {
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  console.log('ORDER DATA', JSON.stringify(orderData, null, 4));

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
        // console.log('NOT FOUND');
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

  const renderHeader = () => {
    return (
      <>
        <View style={styles.wrapItem}>
          <Info dealData={dealData} infor={orderData} />
        </View>
        <View style={styles.wrapItem}>
          <Tracking timeLine={orderData?.orderHistory} />
        </View>
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
        <View style={{...styles.wrapItem, marginTop: 10}}>
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
          <Footer dealData={dealData} />
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
            {currencyFormat(totalPrice, 'đ')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groupData}
        renderItem={({item}) => (
          <StoreItem
            navigation={navigation}
            product={item}
            status={mockData.orderHistory[0]}
            store={item}
          />
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollEvent}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

ListDetail.defaultProps = {
  dealData: {},
};

ListDetail.propTypes = {};

export default ListDetail;
