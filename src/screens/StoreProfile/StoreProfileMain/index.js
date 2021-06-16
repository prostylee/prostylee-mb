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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {Header, HeaderAnimated, ThemeView, Colors} from 'components';

import {storeProfileActions} from 'redux/reducers';

import {
  getStoreLoadingSelector,
  getStoreInfoSelector,
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
    <View style={styles.headerRightContainer}>
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

  const WIDTH = Dimensions.get('window').width;
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
  const {navigation} = props;
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getStoreLoadingSelector(state));
  const storeInfo = useSelector((state) => getStoreInfoSelector(state));

  console.log('STORE INFO', storeInfo);

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

    handleRefreshing(false);
  }, []);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
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
  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        storeActions.getListOfFuturedStoresLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  return (
    <ThemeView isFullView style={styles.container}>
      <HeaderAnimated
        leftComponent={
          <HeaderLeft
            opacity={opacity}
            marginTop={marginTop}
            isAnimated={true}
          />
        }
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
              elevation: 0,
              padding: 0,
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
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              height: 35,
              borderRadius: 4,
              elevation: 0,
              padding: 0,
            }}
            inputStyle={{
              height: 35,
              fontSize: 14,
              lineHeight: 18,
              elevation: 0,
              color: '#8B9399',
            }}
            placeholder={'Tìm kiếm'}
            // onChangeText={onChangeSearch}
            // value={searchQuery}
          />
        }
      />
      <Animated.ScrollView
        style={styles.contentWrapper}
        ref={scrollRef}
        onScroll={onScrollEvent}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CustomBackground />

        <StoreInfo
          logoUri={storeInfo?.logoUrl}
          name={storeInfo?.name}
          address="Ho Chi Minh, Viet Nam"
        />
        <MidAdvertisingSlider />
        <VoucherHorizontalList navigation={props.navigation} />
        <BestSeller />
        <AllProducts />
      </Animated.ScrollView>
    </ThemeView>
  );
};

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
