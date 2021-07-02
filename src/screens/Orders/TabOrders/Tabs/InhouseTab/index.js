/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useRef} from 'react';
import {View, FlatList, Animated, Text, ActivityIndicator} from 'react-native';
import Product from '../../../ProductItem';

import {LocationOutline, LocationArrow} from 'svg/common';
import i18n from 'i18n';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {myPageActions, userSelectors} from 'reducers';
import {
  getListGoodIssuesOrdersLoadingSelector,
  getListGoodIssuesOrdersSelector,
  getListGoodIssuesOrdersLoadmoreLoadingSelector,
  getHasLoadMoreGoodIssueOrdersSelector,
  getPageGoodIssueOrdersSelector,
} from 'redux/selectors/orders';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch, useSelector} from 'react-redux';
import {OrdersLoading} from 'components/Loading/contentLoader';

const InhouseTab = ({navigation, status, actCode = 0, statusId = 0}) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loading = useSelector((state) =>
    getListGoodIssuesOrdersLoadingSelector(state),
  );

  const loadmoreLoading = useSelector((state) =>
    getListGoodIssuesOrdersLoadmoreLoadingSelector(state),
  );

  const page = useSelector((state) => getPageGoodIssueOrdersSelector(state));

  const listCancelSelector = useSelector((state) =>
    getListGoodIssuesOrdersSelector(state),
  );

  const listOrders = listCancelSelector?.content || [];

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreGoodIssueOrdersSelector(state),
  );
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const renderFooter = () => {
    return (
      <>
        <View style={styles.wrapFooterItem}>
          <View style={styles.wrapFooterItemStore}>
            <Text style={styles.labelFooterItemStore}>Femi Clothing Store</Text>
          </View>
          <View style={styles.wrapFooterItemAddress}>
            <Text style={styles.labelFooterItemAddress}>
              95 Đ. Nguyễn Trãi, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí
              Minh
            </Text>
          </View>
          <View style={styles.wrapFooterLocation}>
            <View style={styles.wrapFooterItemLocation}>
              <LocationOutline />
              <Text style={styles.lableFooterItemLocation}>&nbsp;2.0 Km</Text>
            </View>
            <View style={styles.wrapFooterItemButton}>
              <TouchableOpacity style={styles.buttonFooterItemLocation}>
                <LocationArrow />
                <Text style={styles.labelFooterItemLocation}>
                  &nbsp;{i18n.t('orders.findLocation')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListGoodIssuesOrdersLoadmore({
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
      myPageActions.getListGoodIssuesOrders({
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
    dispatch(
      myPageActions.getListGoodIssuesOrders({
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

InhouseTab.defaultProps = {};

InhouseTab.propTypes = {};

export default InhouseTab;
