/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Animated,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {Header, HeaderAnimated, SearchBar, SortDropDown} from 'components';

import {storeProfileActions} from 'redux/reducers';

import {
  getStoreLoadingSelector,
  getStoreInfoSelector,
} from 'redux/selectors/storeProfile';

import {PAGE_DEFAULT, LIMIT_DEFAULT, PRODUCT_SORT_ITEM} from 'constants';
import CustomBackground from './CustomBackground';
import VoucherHorizontalList from './VoucherHorizontalList';

import MidAdvertisingSlider from './MidAdvertisingSlider';

import StoreInfo from './StoreInfo';
import BestSeller from './BestSeller';
import AllProducts from './AllProducts';
import BottomHeaderAnimated from './BottomHeaderAnimated';
import {useRoute} from '@react-navigation/native';

import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOTTOM_HEADER_HEIGHT = 50;
const HEIGHT_HEADER = BOTTOM_HEADER_HEIGHT + 50 + getStatusBarHeight();

const heightShow = Platform.OS === 'ios' ? 280 : 320;
let timeoutSearch = null;

const StoreProfileMain = (props) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const storeId = route?.params?.storeId || 1;

  const [isEndReached, setIsEndReached] = useState(false);
  const [hasLoadmore, setHasLoadmore] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [visible, setVisible] = useState(false);
  const [activeItemLabel, setActiveItemLabel] = useState('');
  const [valueSort, setValueSort] = useState(null);

  const WIDTH = Dimensions.get('window').width;
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const {navigation} = props;
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getStoreLoadingSelector(state));
  const storeInfo = useSelector((state) => getStoreInfoSelector(state));

  useEffect(() => {
    dispatch(storeProfileActions.getStoreInfo(1));
    dispatch(
      storeProfileActions.getAllStoreProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: storeId,
      }),
    );
    dispatch(
      storeProfileActions.getStoreBestSellerProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: storeId,
      }),
    );
  }, [storeId]);

  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);

  const onChangeSearch = (query) => {
    clearTimeout(timeoutSearch);
    dispatch(storeProfileActions.setAllStoreProductLoading(true));
    setKeyword(query);
    timeoutSearch = setTimeout(() => {
      dispatch(
        storeProfileActions.getAllStoreProduct({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          storeId: storeId,
          keyword: query,
        }),
      );
    }, 1000);
  };

  const _handleSort = (value) => {
    let sortOption = {};
    switch (value) {
      case 1: {
        sortOption.sorts = 'name';
        break;
      }
      case 2: {
        sortOption.bestSeller = true;
        break;
      }
      case 3: {
        sortOption.sorts = '-createdAt';
        break;
      }
      case 4: {
        sortOption.sorts = '-priceSale';
        break;
      }
      case 5: {
        sortOption.sorts = 'priceSale';
        break;
      }
      default: {
        sortOption.bestRating = true;
        break;
      }
    }
    dispatch(
      storeProfileActions.getAllStoreProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };
  const onSort = (value) => {
    setValueSort(value);
    let label = PRODUCT_SORT_ITEM.find((v) => v.value === value).label;
    setActiveItemLabel(label);
    _handleSort(value);
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const _handleRefresh = () => {
    handleRefreshing(true);
    dispatch(storeProfileActions.getStoreInfo(1));
    dispatch(
      storeProfileActions.getAllStoreProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: storeId,
      }),
    );
    dispatch(
      storeProfileActions.getStoreBestSellerProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: storeId,
      }),
    );
  };
  const opacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const sortStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: WIDTH,
    height: visible ? HEIGHT : 0,
    marginTop: visible ? HEIGHT_HEADER : 0,
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#fff',
        },
      ]}>
      <HeaderAnimated
        justBottomComponent={true}
        bottomComponent={
          <Animated.View
            style={{
              flexDirection: 'column',
              opacity: opacity,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',

                paddingVertical: 0,
              }}>
              <HeaderLeft isAnimated navigation={props.navigation} />
              <SearchBar
                style={{
                  maxWidth: WIDTH - 160,
                  backgroundColor: '#F4F5F5',
                }}
                placeholder={'Tìm kiếm'}
                onChangeText={onChangeSearch}
                value={keyword}
                onClear={() => onChangeSearch('')}
              />
              <HeaderRight isAnimated />
            </View>
            <BottomHeaderAnimated
              onSort={onSort}
              activeItemLabel={activeItemLabel}
              setVisible={setVisible}
              visible={visible}
            />
          </Animated.View>
        }
        bottomHeight={BOTTOM_HEADER_HEIGHT}
        hideBottomBorder={true}
        heightShow={heightShow}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <Header
        leftComponent={<HeaderLeft navigation={props.navigation} />}
        rightComponent={<HeaderRight />}
        containerStyle={[styles.headerContainer]}
        middleComponent={
          <SearchBar
            style={{
              maxWidth: WIDTH - 160,
              backgroundColor: 'rgba(255,255,255,0.1)',
              zIndex: 10,
            }}
            color="#fff"
            placeholder={'Tìm kiếm'}
            onChangeText={onChangeSearch}
            placeholderTextColor="#8B9399"
            value={keyword}
            onClear={() => onChangeSearch('')}
          />
        }
      />
      <View style={sortStyle}>
        <SortDropDown
          visible={visible}
          setVisible={setVisible}
          setValueSort={onSort}
          valueSort={valueSort}
          options={PRODUCT_SORT_ITEM}
        />
      </View>
      <ScrollView
        style={styles.contentWrapper}
        onScroll={(e) => {
          onScrollEvent(e);

          if (isCloseToBottom(e.nativeEvent) && hasLoadmore && !isEndReached) {
            setIsEndReached(true);
          }
        }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_handleRefresh} />
        }>
        <CustomBackground />
        <StoreInfo storeInfo={storeInfo} />
        <MidAdvertisingSlider banners={storeInfo.storeBannerResponses} />
        <VoucherHorizontalList
          navigation={props.navigation}
          storeId={storeId}
        />
        <BestSeller />
        <AllProducts
          navigation={navigation}
          isEndReached={isEndReached}
          setIsEndReached={setIsEndReached}
          setHasLoadmore={setHasLoadmore}
        />
      </ScrollView>
    </View>
  );
};

StoreProfileMain.defaultProps = {};

StoreProfileMain.propTypes = {};

export default StoreProfileMain;
