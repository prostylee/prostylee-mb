/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

import {ThemeView} from 'components';

import VerticalFeed from './VerticalFeed';
import HeaderFeed from './HeaderFeed';
import TopTrending from './TopTrending';

import {newFeedActions, storeActions, commonActions} from 'redux/reducers';
import {
  getNewFeedSelector,
  getHasLoadMoreSelector,
  getPageSelector,
  getLoadMoreLoadingSelector,
  getNewFeedLoadingSelector,
} from 'redux/selectors/newFeed';
import {
  getTopProduct,
  getTopProductLoadingSelector,
} from 'redux/selectors/stores';
import {targetTypeSelector} from 'redux/selectors/common';

const PAGE_DEFAULT = 0;
const LIMIT_DEFAULT = 12;
const NUMBER_OF_PRODUCT = 3;
const TYPE_STORE = 'STORE';
const TYPE_USER = 'USER';

const NewFeed = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);

  const newFeedList = useSelector((state) => getNewFeedSelector(state));
  const topProduct = useSelector((state) => getTopProduct(state));
  const page = useSelector((state) => getPageSelector(state));
  const hasLoadMore = useSelector((state) => getHasLoadMoreSelector(state));
  const targetType = useSelector((state) => targetTypeSelector(state));

  const loadMoreLoading = useSelector((state) =>
    getLoadMoreLoadingSelector(state),
  );
  const newFeedLoading = useSelector((state) =>
    getNewFeedLoadingSelector(state),
  );
  const topProductLoading = useSelector((state) =>
    getTopProductLoadingSelector(state),
  );

  useEffect(() => {
    dispatch(
      newFeedActions.getNewFeed({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        newFeedType: targetType,
      }),
    );
    dispatch(
      storeActions.getTopProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT - 2,
        numberOfProducts: NUMBER_OF_PRODUCT,
      }),
    );
    handleRefreshing(false);
  }, [refreshing, handleRefresh, targetType]);

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        newFeedActions.handleLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          newFeedType: targetType,
        }),
      );
    }
  };

  const changeTabStore = () => {
    dispatch(commonActions.toggleTargetType(TYPE_STORE));
  };

  const changeTabUser = () => {
    dispatch(commonActions.toggleTargetType(TYPE_USER));
  };

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoading = () => {
    if (!newFeedLoading && !topProductLoading) {
      return false;
    }
    return true;
  };
  return (
    <ThemeView isFullView>
      <HeaderFeed
        changeTabStore={changeTabStore}
        changeTabUser={changeTabUser}
      />
      <ScrollView
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <TopTrending
          loading={handleLoading()}
          navigation={navigation}
          topProduct={topProduct}
        />
        <VerticalFeed
          loading={handleLoading()}
          handleRefresh={handleRefresh}
          handleLoadMore={handleLoadMore}
          newFeedList={newFeedList}
          refreshing={refreshing}
          loadMoreLoading={loadMoreLoading}
        />
      </ScrollView>
    </ThemeView>
  );
};

NewFeed.defaultProps = {};

NewFeed.propTypes = {};

export default NewFeed;
