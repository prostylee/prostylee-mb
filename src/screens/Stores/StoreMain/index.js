/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {
  Header,
  Colors,
  HeaderAnimated,
  Bag,
  ChatIcon,
  SearchBar,
} from 'components';

import {storeActions, searchActions} from 'redux/reducers';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import CustomBackground from './CustomBackground';
import AdvertisingSlider from './AdvertisingSlider';
import FunctionTags from './FunctionTags';

import {MapPinFill} from 'svg/common';
import {Searchbar} from 'react-native-paper';

import PopularBrands from './PopularBrands';
import MidAdvertisingSlider from './MidAdvertisingSlider';
import FeaturedCategories from './FeaturedCategories';
import ForUserTabView from './ForUserTabView';
import useLocation from 'hooks/useLocation';
import {
  getTopBannerSelector,
  getMidBannerSelector,
  getBrandListSelector,
  getCategoryListSelector,
  getStoreMainLoadingSelector,
} from 'redux/selectors/storeMain';
import AppScrollViewIOSBounceColorsWrapper from './AppScrollViewIOSBounceColorsWrapper';

const heightShow = 334;
const HeaderLeft = () => {
  return (
    <TouchableOpacity style={styles.headerLeftContainer}>
      <MapPinFill color="#E82E46" width={18} height={18} backdropColor="#fff" />
      <Text style={styles.locationText}>100 Nguyễn Công Trứ</Text>
    </TouchableOpacity>
  );
};
const HeaderRight = ({color = '#fff', navigation, isAnimated = false}) => {
  return (
    <View style={styles.headerRightContainer}>
      <ChatIcon color={color} />
      <Bag
        color={color}
        width={20}
        height={20}
        strokeWidth={2}
        badgeColor={isAnimated ? '#E82E46' : '#fff'}
        badgeTextColor={isAnimated ? '#fff' : '#000'}
        navigation={navigation}
      />
    </View>
  );
};
const CustomSearchBar = ({navigation, onSearchFocus = () => {}}) => (
  <View style={styles.searchBarContainer}>
    <SearchBar
      style={styles.wrapSearchBar}
      placeholder={i18n.t('search')}
      onFocus={onSearchFocus}
      placeholderTextColor={Colors['$lightGray']}
    />
  </View>
);

const Stores = (props) => {
  const dispatch = useDispatch();
  const BOTTOM_ENDREACHED_HEIGHT = 100;
  const {navigation} = props;
  const [refreshing, handleRefreshing] = useState(false);

  const [isEndReached, setIsEndReached] = useState(false);
  const [hasLoadmore, setHasLoadmore] = useState(false);

  const topBannerList = useSelector((state) => getTopBannerSelector(state));
  const midBannerList = useSelector((state) => getMidBannerSelector(state));
  const brandList = useSelector((state) => getBrandListSelector(state));
  const categoryList = useSelector((state) => getCategoryListSelector(state));

  const loading = useSelector((state) => getStoreMainLoadingSelector(state));

  const location = useLocation();

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const onSearchFocus = () => {
    dispatch(searchActions.setCurrentKeyword(''));
    navigation.navigate('SearchProducts');
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - BOTTOM_ENDREACHED_HEIGHT
    );
  };

  useEffect(() => {
    if (!topBannerList || !topBannerList?.content?.length)
      dispatch(
        storeActions.getTopBanner({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          position: 'mobile_store',
        }),
      );
    if (!midBannerList || !midBannerList?.content?.length)
      dispatch(
        storeActions.getMidBanner({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          position: 'mobile_store',
          targetType: 'ads_fee',
        }),
      );
    if (!brandList || !brandList?.content?.length)
      dispatch(
        storeActions.getBrandList({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
        }),
      );
    if (!categoryList || !categoryList?.content?.length)
      dispatch(
        storeActions.getCategoryList({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          hotStatus: true,
          sorts: '+order',
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
      storeActions.getBrandList({
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
  };
  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);
  return (
    <View style={{flex: 1, backgroundColor: '#E82E46'}}>
      <HeaderAnimated
        bottomComponent={
          <View style={styles.animatedSearchBarContainer}>
            <SearchBar
              style={{
                backgroundColor: '#F4F5F5',
              }}
              inputStyle={styles.wrapSearchBarInput}
              placeholder={i18n.t('search')}
              onFocus={onSearchFocus}
              placeholderTextColor={Colors['$lightGray']}
            />
            <HeaderRight
              isAnimated
              color={Colors['$icon']}
              navigation={navigation}
            />
          </View>
        }
        bottomHeight={30}
        hideBottomBorder={true}
        heightShow={heightShow - 200}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />

      <AppScrollViewIOSBounceColorsWrapper
        style={{flex: 1}}
        topBounceColor="#E82E46"
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
          <View style={{backgroundColor: Colors['$bgColor']}}>
            <CustomBackground />

            <Header
              leftComponent={<HeaderLeft />}
              rightComponent={<HeaderRight navigation={navigation} />}
              containerStyle={styles.headerContainer}
            />
            <CustomSearchBar
              navigation={navigation}
              onSearchFocus={onSearchFocus}
            />

            <AdvertisingSlider
              data={topBannerList?.content ? topBannerList?.content : []}
            />

            <FunctionTags navigation={navigation} />

            <PopularBrands
              data={
                brandList && brandList?.content?.length ? brandList.content : []
              }
            />

            <MidAdvertisingSlider
              data={midBannerList?.content ? midBannerList?.content : []}
            />
            <FeaturedCategories
              data={
                categoryList?.content && categoryList?.content?.length
                  ? categoryList?.content
                  : []
              }
              navigation={navigation}
            />
            <ForUserTabView
              navigation={navigation}
              isEndReached={isEndReached}
              setIsEndReached={setIsEndReached}
              setHasLoadmore={setHasLoadmore}
            />
            {isEndReached ? (
              <View style={styles.listFooterContainer}>
                <ActivityIndicator size="large" color={Colors['$purple']} />
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
