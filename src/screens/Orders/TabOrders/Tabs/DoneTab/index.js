import styles from './styles';
import React, {useRef} from 'react';
import {View, FlatList, Animated, Text, ActivityIndicator} from 'react-native';
import Product from '../../../ProductItem';
import {currencyFormat} from 'utils/currency';
import {ButtonRounded, ButtonOutlined} from 'components';
import i18n from 'i18n';
import {getRatedListSelector} from 'redux/selectors/reviewRating';

import {myPageActions, userSelectors} from 'reducers';
import {
  getListCompletedOrdersLoadingSelector,
  getListCompletedOrdersSelector,
  getListCompletedOrdersLoadmoreLoadingSelector,
  getHasLoadMoreCompletedOrdersSelector,
  getPageCompletedOrdersSelector,
} from 'redux/selectors/orders';
import {LIMIT_DEFAULT, PAGE_DEFAULT, CURRENCY_VIET_NAM} from 'constants';
import {useDispatch, useSelector} from 'react-redux';
import {OrdersLoading} from 'components/Loading/contentLoader';
import {useNavigation, useTheme} from '@react-navigation/native';

const DoneTab = ({status, actCode, statusId = 0}) => {
  const dispatch = useDispatch();
  const {Colors} = useTheme();

  const navigation = useNavigation();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loading = useSelector((state) =>
    getListCompletedOrdersLoadingSelector(state),
  );

  const loadmoreLoading = useSelector((state) =>
    getListCompletedOrdersLoadmoreLoadingSelector(state),
  );

  const page = useSelector((state) => getPageCompletedOrdersSelector(state));

  const listCancelSelector = useSelector((state) =>
    getListCompletedOrdersSelector(state),
  );

  const listOrders = listCancelSelector?.content || [];

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreCompletedOrdersSelector(state),
  );
  const ratedList = useSelector(getRatedListSelector);

  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const renderFooter = (list = [], totalPrice = 0, hasRated = false) => {
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
              {currencyFormat(totalPrice || 0, CURRENCY_VIET_NAM)}
            </Text>
          </View>
        </View>
        <View style={styles.wrapFooterItem}>
          {!hasRated ? (
            <View style={styles.colButtonFooterRating}>
              <ButtonOutlined
                label={i18n.t('orders.ratingProduct')}
                labelStyle={styles.labelBtnOutline}
                onPress={() => {
                  navigation.navigate('ChooseRateProduct', {
                    listProduct: list,
                    onBackPress: () => {
                      dispatch(
                        myPageActions.getListCompletedOrders({
                          page: PAGE_DEFAULT,
                          limit: LIMIT_DEFAULT,
                          loggedInUser: userProfile?.id,
                          statusId: statusId,
                        }),
                      );
                    },
                  });
                }}
              />
            </View>
          ) : null}
          <View
            style={[
              styles.colButtonFooterRepurchase,
              {
                flex: hasRated ? 1 : 0.5,
              },
            ]}>
            <ButtonRounded
              label={i18n.t('orders.repurchase')}
              style={styles.marginLeft10}
              labelStyle={styles.labelBtnRounded}
              onPress={() => {}}
            />
          </View>
        </View>
      </>
    );
  };
  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListCompletedOrdersLoadmore({
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
      myPageActions.getListCompletedOrders({
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
      myPageActions.getListCompletedOrders({
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
  const hasUserRatedAllProducts = (listProduct = []) => {
    return (
      listProduct.filter(
        (item) =>
          item?.productData?.reviewedStatusOfUserLogin ||
          ratedList?.includes(item?.productData?.id),
      ).length === listProduct.length
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
              {renderFooter(
                item?.orderDetails,
                item?.totalMoney,
                hasUserRatedAllProducts(item?.orderDetails),
              )}
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

DoneTab.defaultProps = {};

DoneTab.propTypes = {};

export default DoneTab;
