/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {ThemeView} from 'components';

import VerticalFeed from './VerticalFeed';
import HeaderFeed from './HeaderFeed';
import TopTrending from './TopTrending';
import DynamicUsers from './DynamicUsers';
import StoryBoard from './StoryBoard';

import {
  NewFeedTrendingContentLoading,
  NewFeedContentLoading,
} from 'components/Loading/contentLoader';

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
  getStoriesLoading,
  getStories,
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
  const storiesLoading = useSelector((state) => getStoriesLoading(state));
  const stories = useSelector((state) => getStories(state));

  useEffect(() => {
    dispatch(newFeedActions.resetPage());
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
      dispatch(
        newFeedActions.getStoriesByStore({
          page: PAGE_DEFAULT,
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
      dispatch(
        newFeedActions.getStoriesByUser({
          page: PAGE_DEFAULT,
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
    if (
      !newFeedLoading &&
      !topProductLoading &&
      !dynamicUsersLoading &&
      !storiesLoading
    ) {
      return false;
    }
    return true;
  };

  const LoadingComponent = () => {
    return (
      <View style={styles.loading}>
        <NewFeedTrendingContentLoading />
        {[1, 2].map((item, _i) => (
          <NewFeedContentLoading key={'newFeedLoading' + _i} />
        ))}
      </View>
    );
  };
  return (
    <ThemeView isFullView>
      <HeaderFeed
        targetType={targetType}
        changeTabStore={changeTabStore}
        changeTabUser={changeTabUser}
      />
      {handleLoading() ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <StoryBoard
            targetType={targetType}
            stories={stories}
            loading={handleLoading()}
          />
          <VerticalFeed
            targetType={targetType}
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
              navigation={navigation}
              topProduct={topProduct}
            />
          )}
          {targetType === TYPE_USER && (
            <DynamicUsers
              targetType={targetType}
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
      )}
    </ThemeView>
  );
};

NewFeed.defaultProps = {};

NewFeed.propTypes = {};

export default NewFeed;
