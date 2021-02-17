/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import i18n from 'i18n';

import styles from './styles';

import StoreItem from './item';

import {ThemeView, Header} from 'components';

import {storeActions} from 'redux/reducers';

import {
  getLoadingFuturedStoresSelector,
  listOfFuturedStoresSelector,
  hasLoadMoreSelector,
  loadMoreLoadingSelector,
  getPageSelector,
} from 'redux/selectors/stores';

const PAGE_DEFAULT = 0;
const LIMIT_DEFAULT = 12;

const Stores = (props) => {
  const dispatch = useDispatch();

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

  if (isEmpty(listOfFuturedStores)) {
    return null;
  }

  const listData = listOfFuturedStores?.content || [];

  useEffect(() => {
    dispatch(
      storeActions.getListOfFuturedStore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, [dispatch]);

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
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('headerTitle.featured_store')} />
      <FlatList
        data={listData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item, index}) => (
          <StoreItem key={'stores' + index} storeItem={item} />
        )}
        onEndReached={() => handleLoadMore()}
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ThemeView>
  );
};

Stores.defaultProps = {};

Stores.propTypes = {};

export default Stores;
