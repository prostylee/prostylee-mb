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

import {Header, HeaderAnimated, ThemeView, Colors} from 'components';

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
const heightShow = Platform.OS === 'ios' ? 380 : 420;

const HeaderLeft = ({opacity, isAnimated = false}) => {
  return isAnimated ? (
    <Animated.View style={{opacity}}>
      <TouchableOpacity style={styles.headerLeftContainer}>
        <ChevronLeft color={Colors?.['$icon']} strokeWidth={2} />
      </TouchableOpacity>
    </Animated.View>
  ) : (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          width: 80,
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
          marginBottom: 10,
        },
      ]}>
      <Animated.View style={{opacity}}>
        <TouchableOpacity>
          <MessageOutlined
            color={Colors?.['$icon']}
            width={18}
            height={18}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{opacity}}>
        <TouchableOpacity>
          <Bell
            color={Colors?.['$icon']}
            width={20}
            height={20}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </Animated.View>
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
  // const scrollRef = useRef();

  const {navigation} = props;
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getStoreLoadingSelector(state));
  const storeInfo = useSelector((state) => getStoreInfoSelector(state));
  // const hasLoadMore = useSelector(
  //   (state) => getStoreAllProductHasLoadmore(state),
  //   () => {},
  // );

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
  const marginTop = scrollAnimated.interpolate({
    inputRange: [0, heightShow * 0.2, heightShow],
    outputRange: [-30, 0, 0],
    extrapolate: 'clamp',
  });
  // const width = scrollAnimated.interpolate({
  //   inputRange: [0, heightShow * 0.2, 1],
  //   outputRange: [-30, 0, 0],
  //   extrapolate: 'clamp',
  // });

  return (
    <View isFullView style={styles.container}>
      <HeaderAnimated
        leftComponent={<HeaderLeft opacity={opacity} isAnimated={true} />}
        rightComponent={
          <HeaderRight
            opacity={opacity}
            marginTop={marginTop}
            isAnimated={true}
          />
        }
        midComponent={
          <Searchbar
            style={{
              minWidth: WIDTH - 160,
              backgroundColor: '#F4F5F5',
              height: 35,
              borderRadius: 4,
              elevation: 1,
              padding: 0,
              marginBottom: 10,
            }}
            inputStyle={{
              height: 35,
              fontSize: 14,
              lineHeight: 18,
              elevation: 0,
            }}
            placeholder={'Tìm kiếm'}
            // onChangeText={onChangeSearch}
            // value={searchQuery}
          />
        }
        bottomComponent={<BottomHeaderAnimated navigation={navigation} />}
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
        containerStyle={[
          styles.headerContainer,
          {
            paddingTop: 10,
          },
        ]}
        middleComponent={
          <Searchbar
            style={{
              width: WIDTH - 160,
              // backgroundColor: '#00000017',
              height: 35,
              borderRadius: 4,
              elevation: 1,
              padding: 0,
              marginTop: 30,
              zIndex: 999,
            }}
            inputStyle={{
              height: 35,
              fontSize: 14,
              lineHeight: 18,
              elevation: 0,
              zIndex: 999,
              // color: '#fff',
            }}
            placeholder={'Tìm kiếm'}
            onChangeText={(v) => {
              console.log('VALUE', v);
            }}
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
