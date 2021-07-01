/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useRef, useMemo} from 'react';
import Product from '../../../ProductItem';
import {currencyFormat} from 'utils/currency';
import {ButtonRounded, ButtonOutlined, Colors} from 'components';
import i18n from 'i18n';
import {View, FlatList, Animated, Text, ActivityIndicator} from 'react-native';
import {myPageActions, userSelectors} from 'reducers';
import {
  getListReceiveOrdersLoadingSelector,
  getListReceiveOrdersSelector,
  getListReceiveOrdersLoadmoreLoadingSelector,
  getHasLoadMoreReceiveOrdersSelector,
  getPageReceiveOrdersSelector,
} from 'redux/selectors/orders';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch, useSelector} from 'react-redux';
import {OrdersLoading} from 'components/Loading/contentLoader';

const mockData = [
  {
    id: 1,
    orderHistory: {
      id: 1,
      statusName: 'Đã huỷ',
      actCode: 90,
    },
    totalMoney: 1000_000,
    orderDetails: [
      {
        amount: 1,
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
  },
  {
    id: 1,
    orderHistory: {
      id: 1,
      statusName: 'Đã huỷ',
      actCode: 90,
    },
    totalMoney: 1000_000,
    orderDetails: [
      {
        amount: 1,
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
  },
];

const CancelTab = ({navigation, status, actCode = 0, statusId = 0}) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loading = useSelector((state) =>
    getListReceiveOrdersLoadingSelector(state),
  );

  const loadmoreLoading = useSelector((state) =>
    getListReceiveOrdersLoadmoreLoadingSelector(state),
  );

  const page = useSelector((state) => getPageReceiveOrdersSelector(state));

  const listCancelSelector = useSelector((state) =>
    getListReceiveOrdersSelector(state),
  );

  const listOrders = listCancelSelector?.content || [];

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreReceiveOrdersSelector(state),
  );
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const renderFooter = (list = [], totalPrice = 0) => {
    const totalItem = list?.reduce((total, item) => {
      return (total += item?.amount);
    }, 0);
    return (
      <>
        <View style={styles.wrapFooterItem}>
          <View style={styles.colCountFooter}>
            <Text style={styles.labelCountFooter}>
              {i18n.t('orders.countProduct', {count: totalItem})}
            </Text>
          </View>
          <View style={styles.colTotalFooter}>
            <Text style={styles.labelTotalFooter}>
              {currencyFormat(totalPrice || 0, 'đ')}
            </Text>
          </View>
        </View>
      </>
    );
  };

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListReceiveOrdersLoadmore({
          loggedInUser: userProfile?.id,
          page: page,
          limit: LIMIT_DEFAULT,
          statusId: statusId,
        }),
      );
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      myPageActions.getListReceiveOrders({
        loggedInUser: userProfile?.id,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        statusId: statusId,
      }),
    );
  };
  React.useEffect(() => {
    if (!loading) setIsRefreshing(false);
  }, [loading]);

  React.useEffect(() => {
    // if (!listOrders || !listOrders.length)
    dispatch(
      myPageActions.getListReceiveOrders({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        loggedInUser: userProfile?.id,
        statusId: statusId,
      }),
    );
  }, []);
  const renderFooterIndicator = () => {
    if (!loadmoreLoading) {
      return <View style={styles.viewFooter} />;
    }
    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && !isRefreshing ? (
        [1, 2, 3, 4, 5].map(() => (
          <View style={{padding: 16}}>
            <OrdersLoading />
          </View>
        ))
      ) : listOrders && listOrders?.length ? (
        <FlatList
          data={listOrders}
          renderItem={({item}) => (
            <Product
              navigation={navigation}
              product={item?.orderDetails?.[0]}
              status={statusId}
              orderId={item?.id}>
              {renderFooter(item?.orderDetails, item?.totalMoney)}
            </Product>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollEvent}
          onEndReached={handleLoadMore}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={renderFooterIndicator}
        />
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </View>
  );
};

CancelTab.defaultProps = {};

CancelTab.propTypes = {};

export default CancelTab;
