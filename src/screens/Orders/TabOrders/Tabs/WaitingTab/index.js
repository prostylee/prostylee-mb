import styles from './styles';
import React, {useRef} from 'react';
import {View, FlatList, Animated, Text, ActivityIndicator} from 'react-native';
import Product from '../../../ProductItem';
import {currencyFormat} from 'utils/currency';
import i18n from 'i18n';
import {myPageActions, userSelectors} from 'reducers';
import {
  getListCreatedOrdersLoadingSelector,
  getListCreatedOrdersSelector,
  getListCreatedOrdersLoadmoreLoadingSelector,
  getHasLoadMoreCreatedOrdersSelector,
  getPageCreatedOrdersSelector,
} from 'redux/selectors/orders';
import {LIMIT_DEFAULT, PAGE_DEFAULT, CURRENCY_VIET_NAM} from 'constants';
import {useDispatch, useSelector} from 'react-redux';
import {OrdersLoading} from 'components/Loading/contentLoader';
import {useTheme} from '@react-navigation/native';

const WaitingTab = ({navigation, status, actCode = 0, statusId = 0}) => {
  const dispatch = useDispatch();
  const {Colors} = useTheme();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loading = useSelector((state) =>
    getListCreatedOrdersLoadingSelector(state),
  );

  const loadmoreLoading = useSelector((state) =>
    getListCreatedOrdersLoadmoreLoadingSelector(state),
  );

  const page = useSelector((state) => getPageCreatedOrdersSelector(state));

  const listCancelSelector = useSelector((state) =>
    getListCreatedOrdersSelector(state),
  );

  const listOrders = listCancelSelector?.content || [];

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreCreatedOrdersSelector(state),
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
      <View style={styles.wrapFooterItem}>
        <View style={styles.colCountFooter}>
          <Text style={styles.labelCountFooter}>
            {i18n.t('orders.countProduct', {count: totalItem})}
          </Text>
        </View>
        <View style={styles.colTotalFooter}>
          <Text style={styles.labelTotalFooter}>
            {currencyFormat(totalPrice || 0, CURRENCY_VIET_NAM)}
          </Text>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListCreatedOrdersLoadmore({
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
      myPageActions.getListCreatedOrders({
        loggedInUser: userProfile?.id,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        statusId: statusId,
      }),
    );
  };
  React.useEffect(() => {
    if (!loading) {
      setIsRefreshing(false);
    }
  }, [loading]);

  React.useEffect(() => {
    dispatch(
      myPageActions.getListCreatedOrders({
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
        [1, 2, 3, 4, 5].map((v) => (
          <View style={styles.padding16} key={v}>
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

WaitingTab.defaultProps = {};

WaitingTab.propTypes = {};

export default WaitingTab;
