/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {Header, Colors, HeaderAnimated} from 'components';

import {storeActions} from 'redux/reducers';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import CustomBackground from './CustomBackground';
import AdvertisingSlider from './AdvertisingSlider';
import FunctionTags from './FunctionTags';

import {MapPin, MessageOutlined, Bag, Search, MapPinFill} from 'svg/common';
import {Searchbar} from 'react-native-paper';

import PopularBrands from './PopularBrands';
import MidAdvertisingSlider from './MidAdvertisingSlider';
import FeaturedCategories from './FeaturedCategories';
import ForUserTabView from './ForUserTabView';

import useLocation from '../../../hooks/useLocation';

import {
  getTopBannerSelector,
  getMidBannerSelector,
  getBrandListSelector,
  getCategoryListSelector,
} from 'redux/selectors/storeMain';
const heightShow = 334;
const WIDTH = Dimensions.get('window').width;
const WIDTH_IMAGE = WIDTH / 2 - 14;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;
const HeaderLeft = () => {
  return (
    <TouchableOpacity style={styles.headerLeftContainer}>
      <MapPinFill color="#fff" width={18} height={18} backdropColor="#E82E46" />
      <Text style={styles.locationText}>100 Nguyễn Công Trứ</Text>
    </TouchableOpacity>
  );
};
const HeaderRight = ({color = '#fff'}) => {
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity>
        <MessageOutlined color={color} width={18} height={18} strokeWidth={2} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Bag color={color} width={20} height={20} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};
const CustomSearchBar = () => (
  <View style={styles.searchBarContainer}>
    <Searchbar placeholder={i18n.t('search')} />
  </View>
);

const Stores = (props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const [refreshing, handleRefreshing] = useState(false);

  const topBannerList = useSelector((state) => getTopBannerSelector(state));
  const midBannerList = useSelector((state) => getMidBannerSelector(state));
  const brandList = useSelector((state) => getBrandListSelector(state));
  const categoryList = useSelector((state) => getCategoryListSelector(state));

  const location = useLocation();
  console.log('LOCATION', location);

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    if (!topBannerList || !topBannerList?.content?.length)
      dispatch(
        storeActions.getTopBanner({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
        }),
      );
    if (!midBannerList || !midBannerList?.content?.length)
      dispatch(
        storeActions.getMidBanner({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
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
  }, []);
  const handleRefresh = () => {
    handleRefreshing(true);
  };
  const renderFooter = () => {
    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#E82E46'}}>
      <HeaderAnimated
        bottomComponent={
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: 16,
              flexDirection: 'row',
            }}>
            <Searchbar
              style={{flex: 1, height: 40}}
              placeholder={i18n.t('search')}
            />
            <HeaderRight color={Colors['$icon']} />
          </View>
        }
        bottomHeight={0}
        hideBottomBorder={true}
        heightShow={heightShow - 100}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
        backgroundColor={'#fff'}
      />
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollEvent}
        scrollEventThrottle={16}>
        <View style={{backgroundColor: Colors['$bgColor']}}>
          <CustomBackground />

          <Header
            // title={i18n.t('headerTitle.featured_store')}
            leftComponent={<HeaderLeft />}
            rightComponent={<HeaderRight />}
            containerStyle={styles.headerContainer}
          />
          <CustomSearchBar />

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
          />
          <ForUserTabView />
        </View>
      </ScrollView>
    </View>
  );
};

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
