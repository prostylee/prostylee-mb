import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {Header, Colors, SearchBar, ChatIcon, Bag} from 'components';

import {storeProfileActions} from 'redux/reducers';

import {
  getStoreLoadingSelector,
  getStoreInfoSelector,
} from 'redux/selectors/storeProfile';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import VoucherHorizontalList from './VoucherHorizontalList';
import StatisticsTags from './StatisticsTags';

import MidAdvertisingSlider from './MidAdvertisingSlider';
import PostList from './PostList';

import StoreInfo from './StoreInfo';
import BestSeller from './BestSeller';
import AllProducts from './AllProducts';
import {useRoute} from '@react-navigation/native';

let timeoutSearch = null;

const StoreProfileMain = (props) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const storeId = route?.params?.storeId || 1;

  const [isEndReached, setIsEndReached] = useState(false);
  const [hasLoadmore, setHasLoadmore] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [activeItemLabel, setActiveItemLabel] = useState('');
  const [valueSort, setValueSort] = useState(null);
  const [filterValue, setFilterValue] = useState(null);

  const {navigation} = props;
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getStoreLoadingSelector(state));
  const storeInfo = useSelector((state) => getStoreInfoSelector(state));

  useEffect(() => {
    if (!valueSort) {
      setActiveItemLabel('');
    }
  }, [valueSort]);
  useEffect(() => {
    dispatch(storeProfileActions.getStoreInfo(storeId));
    dispatch(storeProfileActions.getStoreStatistics(storeId));
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
    dispatch(
      storeProfileActions.getStorePost({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeOwnerId: storeId,
      }),
    );
  }, [storeId]);

  useEffect(() => {
    if (!loading) {
      handleRefreshing(false);
    }
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
  const _handleRefresh = () => {
    handleRefreshing(true);
    dispatch(storeProfileActions.getStoreInfo(storeId));
    dispatch(storeProfileActions.getStoreStatistics(storeId));
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
    dispatch(
      storeProfileActions.getStorePost({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        storeOwnerId: storeId,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        isDefault
        rightComponent={
          <View style={styles.rightHeader}>
            <TouchableOpacity>
              <ChatIcon color={Colors['$black']} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Bag
                color={Colors['$black']}
                width={20}
                height={20}
                strokeWidth={2}
                badgeColor={'#E82E46'}
                badgeTextColor={'#fff'}
                navigation={navigation}
              />
            </TouchableOpacity>
          </View>
        }
        middleComponent={
          <SearchBar
            style={styles.headerSearchBarBlack}
            color="#333"
            placeholder={i18n.t('Search.searchInStore')}
            onChangeText={onChangeSearch}
            placeholderTextColor="#8B9399"
            value={keyword}
            onClear={() => onChangeSearch('')}
          />
        }
        containerStyle={styles.header}
        titleStyle={styles.headerTitle}
      />
      <ScrollView
        style={styles.contentWrapper}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_handleRefresh} />
        }>
        <StoreInfo storeInfo={storeInfo} />
        <MidAdvertisingSlider banners={storeInfo?.storeBannerResponses} />
        <StatisticsTags />
        <VoucherHorizontalList
          navigation={props.navigation}
          storeId={storeId}
        />
        <BestSeller />
        <View style={styles.divider} />
        <PostList />
        <View style={styles.divider} />
        <AllProducts
          navigation={navigation}
          isEndReached={isEndReached}
          setIsEndReached={setIsEndReached}
          setHasLoadmore={setHasLoadmore}
          setFilterValue={setFilterValue}
          setValueSort={setValueSort}
          filterValue={filterValue}
          valueSort={valueSort}
        />
      </ScrollView>
    </View>
  );
};

StoreProfileMain.defaultProps = {};

StoreProfileMain.propTypes = {};

export default StoreProfileMain;
