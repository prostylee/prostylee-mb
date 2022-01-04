import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';
import styles from './styles';
import {Header, Colors} from 'components';
import {storeActions, searchActions, storeProfileActions} from 'redux/reducers';
import {
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
  TIME_RANGE_IN_DAYS,
  TYPE_USER,
} from 'constants';
import AdvertisingSlider from './AdvertisingSlider';
import NavigationTags from './NavigationTags';

import TopStores from './TopStores';
import MidAdvertisingSlider from './MidAdvertisingSlider';
import FeaturedCategories from './FeaturedCategories';
import ForUserTabView from './ForUserTabView';
import ProductViewedRecently from './ProductViewedRecently';

import {
  getTopBannerSelector,
  getMidBannerSelector,
  getCategoryListSelector,
  getStoreMainLoadingSelector,
} from 'redux/selectors/storeMain';
import {getTopProduct} from 'redux/selectors/stores';
import {productSelectors} from 'reducers';

import AppScrollViewIOSBounceColorsWrapper from './AppScrollViewIOSBounceColorsWrapper';
import {useIsFocused} from '@react-navigation/native';
import HeaderLeft from './HeaderLeftComponent';
import HeaderRight from './HeaderRightComponent';

const BOTTOM_ENDREACHED_HEIGHT = 300;

const Stores = (props) => {
  const dispatch = useDispatch();

  const {navigation} = props;

  const [refreshing, handleRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [hasLoadmore, setHasLoadmore] = useState(false);

  const topBannerList = useSelector((state) => getTopBannerSelector(state));

  const midBannerList = useSelector((state) => getMidBannerSelector(state));

  const categoryList = useSelector((state) => getCategoryListSelector(state));

  const topProduct = useSelector((state) => getTopProduct(state));

  const productViewedRecently = useSelector((state) =>
    productSelectors.getProductViewedRecently(state),
  );
  const loading = useSelector((state) => getStoreMainLoadingSelector(state));

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const isFocused = useIsFocused();
  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - BOTTOM_ENDREACHED_HEIGHT
    );
  };

  useEffect(() => {
    dispatch(
      storeActions.getTopBanner({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: '+order',
        position: 'mobile_store',
      }),
    );
    dispatch(
      storeActions.getMidBanner({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        position: 'mobile_store',
      }),
    );
    dispatch(
      storeActions.getCategoryList({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        hotStatus: true,
        sorts: '+order',
      }),
    );
    dispatch(
      storeActions.getTopProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: TYPE_USER,
        numberOfProducts: 1,
        timeRangeInDays: TIME_RANGE_IN_DAYS,
      }),
    );
    dispatch(storeActions.getBottomTabList());
  }, []);
  const _handleRefresh = () => {
    handleRefreshing(true);
    dispatch(
      storeActions.getTopBanner({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    dispatch(
      storeActions.getMidBanner({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    dispatch(
      storeActions.getCategoryList({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        hotStatus: true,
        sorts: '+order',
      }),
    );
    dispatch(
      storeActions.getTopProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: TYPE_USER,
        numberOfProducts: 1,
        timeRangeInDays: TIME_RANGE_IN_DAYS,
      }),
    );
  };
  useEffect(() => {
    if (!loading) {
      handleRefreshing(false);
    }
  }, [loading]);

  useEffect(() => {
    if (isFocused) {
      dispatch(storeActions.clearPersonalSalersFilterState());
      dispatch(storeActions.clearBestSellersFilterState());
      dispatch(searchActions.clearProductsFilterState());
      dispatch(storeProfileActions.clearStoreProfileFilterState());
    }
  }, [isFocused]);

  const featureCategoryList =
    categoryList?.content && categoryList?.content?.length
      ? categoryList?.content?.slice(0, 8)
      : [];

  return (
    <View style={styles.wrapper}>
      <Header
        leftComponent={<HeaderLeft />}
        rightComponent={
          <HeaderRight navigation={navigation} color={Colors['$black']} />
        }
        title={i18n.t('name')}
        titleStyle={styles.headerTitle}
        containerStyle={styles.headerContainer}
      />

      <AppScrollViewIOSBounceColorsWrapper
        style={styles.flex1}
        topBounceColor="#fff"
        bottomBounceColor="#fff">
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.container}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            onScrollEvent(e);
            if (isCloseToBottom(e.nativeEvent) && hasLoadmore) {
              setIsEndReached(true);
            }
          }}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_handleRefresh}
            />
          }>
          <View style={{backgroundColor: Colors.$bgColor}}>
            <AdvertisingSlider
              loading={loading}
              data={topBannerList?.content ? topBannerList?.content : []}
            />
            <FeaturedCategories
              data={featureCategoryList}
              navigation={navigation}
            />

            <NavigationTags navigation={navigation} />

            <MidAdvertisingSlider
              loading={loading}
              data={midBannerList?.content ? midBannerList?.content : []}
            />
            <TopStores topProduct={topProduct} />
            {(productViewedRecently?.content || [])?.length ? (
              <ProductViewedRecently
                data={productViewedRecently?.content || []}
                onSelect={(id) => navigation.navigate('ProductDetail', {id})}
              />
            ) : null}
            <ForUserTabView
              navigation={navigation}
              isEndReached={isEndReached}
              setIsEndReached={setIsEndReached}
              setHasLoadmore={setHasLoadmore}
            />
            {isEndReached ? (
              <View style={styles.listFooterContainer}>
                <ActivityIndicator size="small" color={Colors.$purple} />
              </View>
            ) : null}
          </View>
        </ScrollView>
      </AppScrollViewIOSBounceColorsWrapper>
    </View>
  );
};

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
