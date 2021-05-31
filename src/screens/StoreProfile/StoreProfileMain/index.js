/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n';

import styles from './styles';

import {Header, Colors} from 'components';

import {storeActions} from 'redux/reducers';

import {
  getLoadingFuturedStoresSelector,
  listOfFuturedStoresSelector,
  hasLoadMoreSelector,
  loadMoreLoadingSelector,
  getPageSelector,
} from 'redux/selectors/stores';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import CustomBackground from './CustomBackground';
import VoucherHorizontalList from './VoucherHorizontalList';

import {MapPin, MessageOutlined, Bag, Search, MapPinFill} from 'svg/common';
import {Searchbar} from 'react-native-paper';

import MidAdvertisingSlider from './MidAdvertisingSlider';
import {ChevronLeft} from '../../../svg/common';
import {ThemeView} from '../../../components';
import StoreInfo from './StoreInfo';

const HeaderLeft = () => {
  return (
    <TouchableOpacity style={styles.headerLeftContainer}>
      <ChevronLeft color="#fff" strokeWidth={2} />
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
  const WIDTH = Dimensions.get('window').width;

  const {navigation} = props;
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
    <ThemeView isFullView style={styles.container}>
      <Header
        leftComponent={<HeaderLeft />}
        rightComponent={<HeaderRight />}
        containerStyle={styles.headerContainer}
        middleComponent={
          <Searchbar
            style={{
              minWidth: WIDTH - 140,
              //   backgroundColor: '#333333',
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
      />
      <ScrollView style={styles.contentWrapper}>
        <CustomBackground />
        <StoreInfo />
        <MidAdvertisingSlider />
        <VoucherHorizontalList />
      </ScrollView>
    </ThemeView>
  );
};

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
