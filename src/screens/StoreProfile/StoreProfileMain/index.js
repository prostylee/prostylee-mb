/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {Header, HeaderAnimated, SearchBar, Colors} from 'components';

import {storeProfileActions} from 'redux/reducers';

import {
  getStoreLoadingSelector,
  getStoreInfoSelector,
  getStoreAllProductHasLoadmore,
} from 'redux/selectors/storeProfile';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import CustomBackground from './CustomBackground';
import VoucherHorizontalList from './VoucherHorizontalList';

import {MessageOutlined, Bag, ChevronLeft, Bell} from 'svg/common';
import {Searchbar} from 'react-native-paper';

import MidAdvertisingSlider from './MidAdvertisingSlider';

import StoreInfo from './StoreInfo';
import BestSeller from './BestSeller';
import AllProducts from './AllProducts';
import BottomHeaderAnimated from './BottomHeaderAnimated';
const heightShow = Platform.OS === 'ios' ? 280 : 320;

const HeaderLeft = ({opacity, isAnimated = false}) => {
  return isAnimated ? (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          paddingLeft: 16,
        },
      ]}>
      <ChevronLeft color={Colors?.['$icon']} strokeWidth={2} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          paddingTop: 3,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <ChevronLeft color="#fff" strokeWidth={2} />
    </TouchableOpacity>
  );
};
const HeaderRight = ({opacity, isAnimated = false}) => {
  return isAnimated ? (
    <View
      style={[
        styles.headerRightContainer,
        {
          width: 80,
          paddingRight: 19,
        },
      ]}>
      <TouchableOpacity>
        <MessageOutlined
          color={Colors?.['$icon']}
          width={18}
          height={18}
          strokeWidth={2}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Bell
          color={Colors?.['$icon']}
          width={20}
          height={20}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={[
        styles.headerRightContainer,
        {
          width: 80,
        },
      ]}>
      <TouchableOpacity>
        <MessageOutlined color="#fff" width={18} height={18} strokeWidth={2} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Bag color="#fff" width={20} height={20} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

const Stores = (props) => {
  const dispatch = useDispatch();

  const [isEndReached, setIsEndReached] = useState(false);
  const [hasLoadmore, setHasLoadmore] = useState(false);

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
        storeId: 1,
      }),
    );
    dispatch(
      storeProfileActions.getStoreBestSellerProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: 1,
      }),
    );
  }, []);

  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);

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
        storeId: 1,
      }),
    );
    dispatch(
      storeProfileActions.getStoreBestSellerProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeId: 1,
      }),
    );
  };
  const opacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
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
              marginBottom: 20,
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
              <HeaderLeft isAnimated />
              <SearchBar
                style={{
                  maxWidth: WIDTH - 160,
                  backgroundColor: '#F4F5F5',
                }}
                placeholder={'Tìm kiếm'}
              />
              <HeaderRight isAnimated />
            </View>
            <BottomHeaderAnimated />
          </Animated.View>
        }
        //bottomComponent={<BottomHeaderAnimated navigation={navigation} />}
        bottomHeight={0}
        hideBottomBorder={true}
        heightShow={heightShow}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <Header
        leftComponent={<HeaderLeft />}
        rightComponent={<HeaderRight />}
        containerStyle={[styles.headerContainer]}
        middleComponent={
          <SearchBar
            style={{
              maxWidth: WIDTH - 160,
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              zIndex: 10,
            }}
            placeholder={'Tìm kiếm'}
            onChangeText={(v) => {
              console.log('VALUE', v);
            }}
            placeholderTextColor="#8B9399"

            // value={searchQuery}
          />
        }
      />
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
        <StoreInfo
          logoUri={storeInfo?.logoUrl}
          name={storeInfo?.name}
          address="Ho Chi Minh, Viet Nam"
        />
        <MidAdvertisingSlider />
        <VoucherHorizontalList navigation={props.navigation} />
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

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
