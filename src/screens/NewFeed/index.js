/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

import {ThemeView} from 'components';

import VerticalFeed from './VerticalFeed';
import HeaderFeed from './HeaderFeed';
import TopTrending from './TopTrending';
import DynamicUsers from './DynamicUsers';
import StoryBoard from './StoryBoard';

import {
  newFeedActions,
  storeActions,
  commonActions,
  dynamicUsersActions,
} from 'redux/reducers';
import {
  getNewFeedSelector,
  getHasLoadMoreSelector,
  getPageSelector,
  getLoadMoreLoadingSelector,
  getNewFeedLoadingSelector,
  threeFirstNewFeedItemSelector,
} from 'redux/selectors/newFeed';
import {
  getTopProduct,
  getTopProductLoadingSelector,
} from 'redux/selectors/stores';
import {
  loadingSelector,
  listDynamicUsersSelector,
} from 'redux/selectors/dynamicUsers';
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
  const threeFirstNewFeedItem = useSelector((state) =>
    threeFirstNewFeedItemSelector(state),
  );
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
  const dynamicUsersLoading = useSelector((state) => loadingSelector(state));
  const listDynamicUsers = useSelector((state) =>
    listDynamicUsersSelector(state),
  );

  useEffect(() => {
    dispatch(
      newFeedActions.getNewFeed({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        newFeedType: targetType,
      }),
    );
    if (targetType === TYPE_STORE) {
      dispatch(
        storeActions.getTopProduct({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT - 2,
          numberOfProducts: NUMBER_OF_PRODUCT,
        }),
      );
    }
    if (targetType === TYPE_USER) {
      dispatch(
        dynamicUsersActions.getDynamicUser({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT - 2,
        }),
      );
    }
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
    if (!newFeedLoading && !topProductLoading && !dynamicUsersLoading) {
      return false;
    }
    return true;
  };
  return (
    <ThemeView isFullView>
      <HeaderFeed
        targetType={targetType}
        changeTabStore={changeTabStore}
        changeTabUser={changeTabUser}
      />
      <ScrollView
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StoryBoard />
        <VerticalFeed
          targetType={targetType}
          loading={handleLoading()}
          handleRefresh={handleRefresh}
          handleLoadMore={() => {}}
          newFeedList={threeFirstNewFeedItem}
          refreshing={refreshing}
          loadMoreLoading={false}
          isFirst={true}
        />
        {targetType === TYPE_STORE && (
          <TopTrending
            targetType={targetType}
            loading={handleLoading()}
            navigation={navigation}
            topProduct={topProduct}
          />
        )}
        {targetType === TYPE_USER && (
          <DynamicUsers
            targetType={targetType}
            loading={handleLoading()}
            navigation={navigation}
            listDynamicUsers={listDynamicUsers}
          />
        )}
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
