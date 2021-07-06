import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import styles from './styles';
import {Colors, ThemeView} from 'components';

import HeaderFeed from './HeaderFeed';
import TopTrending from './TopTrending';
import DynamicUsers from './DynamicUsers';
import StoryBoard from './Stories';

import {
  NewFeedContentLoading,
  NewFeedTrendingContentLoading,
} from 'components/Loading/contentLoader';

import {
  commonActions,
  dynamicUsersActions,
  newFeedActions,
  storeActions,
} from 'redux/reducers';
import {
  getHasLoadMoreSelector,
  getLoadMoreLoadingSelector,
  getNewFeedLoadingSelector,
  getNewFeedSelector,
  getPageSelector,
  getStories,
  getStoriesLoading,
  threeFirstNewFeedItemSelector,
} from 'redux/selectors/newFeed';
import {
  getTopProduct,
  getTopProductLoadingSelector,
} from 'redux/selectors/stores';
import {
  listDynamicUsersSelector,
  loadingSelector,
} from 'redux/selectors/dynamicUsers';
import {targetTypeSelector} from 'redux/selectors/common';

import {
  LIMIT_DEFAULT,
  NUMBER_OF_PRODUCT,
  PAGE_DEFAULT,
  TYPE_STORE,
  TYPE_USER,
} from 'constants';
import FeedItem from './VerticalFeed/item';

const NewFeedRowItemType = {
  STORIES: {
    id: -1,
    type: 'STORIES',
  },
  STORES: {
    id: -2,
    type: 'STORES',
  },
  USERS: {
    id: -3,
    type: 'USERS',
  },
};

const NewFeed = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);
  const [allNewFeeds, setAllNewFeeds] = useState([]);

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
    } else if (targetType === TYPE_USER) {
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
  }, [refreshing, targetType]);

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
    if (targetType !== TYPE_STORE) {
      dispatch(newFeedActions.setLoading(true));
      dispatch(commonActions.toggleTargetType(TYPE_STORE));
    }
  };

  const changeTabUser = () => {
    if (targetType !== TYPE_USER) {
      dispatch(newFeedActions.setLoading(true));
      dispatch(commonActions.toggleTargetType(TYPE_USER));
    }
  };

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoading = () => {
    return (
      newFeedLoading ||
      topProductLoading ||
      dynamicUsersLoading ||
      storiesLoading
    );
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

  useEffect(() => {
    if (!handleLoading()) {
      const items = [];

      if (stories && stories?.content?.length) {
        items.push({
          id: NewFeedRowItemType.STORIES.id,
          type: NewFeedRowItemType.STORIES.type,
          items: stories,
        });
      }

      if (threeFirstNewFeedItem && threeFirstNewFeedItem?.content?.length) {
        items.push(...threeFirstNewFeedItem?.content);
      }

      if (
        targetType === TYPE_STORE &&
        topProduct &&
        topProduct?.content?.length
      ) {
        items.push({
          id: NewFeedRowItemType.STORES.id,
          type: NewFeedRowItemType.STORES.type,
          items: topProduct,
        });
      }

      if (
        targetType === TYPE_USER &&
        listDynamicUsers &&
        listDynamicUsers?.content?.length
      ) {
        items.push({
          id: NewFeedRowItemType.USERS.id,
          type: NewFeedRowItemType.USERS.type,
          items: listDynamicUsers,
        });
      }

      if (newFeedList && newFeedList?.content?.length) {
        items.push(...newFeedList?.content);
      }

      setAllNewFeeds(items);
    }
  }, [
    stories,
    threeFirstNewFeedItem,
    topProduct,
    listDynamicUsers,
    newFeedList,
  ]);

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

  const renderItem = (item, index) => {
    if (item.type === NewFeedRowItemType.STORIES.type) {
      return <StoryBoard targetType={targetType} stories={item.items} />;
    }

    if (item.type === NewFeedRowItemType.STORES.type) {
      return (
        <TopTrending
          targetType={targetType}
          navigation={navigation}
          topProduct={item.items}
        />
      );
    }

    if (item.type === NewFeedRowItemType.USERS.type) {
      return (
        <DynamicUsers
          targetType={targetType}
          navigation={navigation}
          listDynamicUsers={item.items}
        />
      );
    }

    return (
      <FeedItem
        isProfile={false}
        targetType={targetType}
        key={'newFeedItem' + targetType + index}
        newFeedItem={item}
      />
    );
  };

  return (
    <ThemeView isFullView>
      {Platform.OS === 'android' && (
        <StatusBar barStyle="dark-content" translucent backgroundColor="#FFF" />
      )}
      <HeaderFeed
        targetType={targetType}
        changeTabStore={changeTabStore}
        changeTabUser={changeTabUser}
      />
      {handleLoading() ? (
        <LoadingComponent />
      ) : (
        <FlatList
          data={allNewFeeds || []}
          keyExtractor={(item, index) =>
            'newFeedKeyExtractor' + targetType + index
          }
          renderItem={({item, index}) => renderItem(item, index)}
          onEndReached={handleLoadMore}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemeView>
  );
};

NewFeed.defaultProps = {};

NewFeed.propTypes = {};

export default NewFeed;
