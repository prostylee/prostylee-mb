/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, Colors, ContainerView} from 'components';

import {storeActions} from 'redux/reducers';

import {StoreLoading} from 'components/Loading/contentLoader';

import {
  getLoadingFuturedStoresSelector,
  listOfFuturedStoresSelector,
  hasLoadMoreSelector,
  loadMoreLoadingSelector,
  getPageSelector,
} from 'redux/selectors/stores';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import CustomBackground from './CustomBackground';
import AdvertisingSlider from './AdvertisingSlider';
import FunctionTags from './FunctionTags';

import {MapPin, MessageOutlined, Bag, Search, MapPinFill} from 'svg/common';
import {Searchbar} from 'react-native-paper';
import img from '../../assets/images/slider.png';

import {Image} from '../../components';
import PopularBrands from './PopularBrands';
import AdvertisingImage from './AdvertisingImage';
import FeaturedCategories from './FeaturedCategories';
import ForUserTabView from './ForUserTabView';

const HeaderLeft = () => {
  return (
    <TouchableOpacity style={styles.headerLeftContainer}>
      <MapPinFill color="#fff" width={18} height={18} backdropColor="#E82E46" />
      <Text style={styles.locationText}>100 Nguyễn Công Trứ</Text>
    </TouchableOpacity>
  );
};
const HeaderRight = () => {
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity>
        <MessageOutlined color="#fff" width={18} height={18} strokeWidth={2} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Bag color="#fff" width={20} height={20} strokeWidth={2} />
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

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) =>
    getLoadingFuturedStoresSelector(state),
  );
  const listOfFuturedStores = useSelector((state) =>
    listOfFuturedStoresSelector(state),
  );
  const loadMoreLoading = useSelector((state) =>
    loadMoreLoadingSelector(state),
  );
  const hasLoadMore = useSelector((state) => hasLoadMoreSelector(state));
  const page = useSelector((state) => getPageSelector(state));

  const listData = listOfFuturedStores?.content || [];

  useEffect(() => {
    dispatch(
      storeActions.getListOfFuturedStore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

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
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomBackground />
      <Header
        // title={i18n.t('headerTitle.featured_store')}
        leftComponent={<HeaderLeft />}
        rightComponent={<HeaderRight />}
        containerStyle={styles.headerContainer}
      />
      <CustomSearchBar />
      <AdvertisingSlider />
      <FunctionTags />
      <PopularBrands />
      <AdvertisingImage />
      <FeaturedCategories />
      <ForUserTabView />
    </ScrollView>
  );
};

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
