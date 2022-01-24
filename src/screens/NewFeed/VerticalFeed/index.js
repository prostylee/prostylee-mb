import React, {useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {newFeedSelectors, newFeedActions} from 'reducers';
import styles from './styles';

import {Colors} from 'components';

import FeedItem from './item';

const VerticalFeed = ({
  newFeedList,
  handleLoadMore,
  loadMoreLoading,
  handleRefresh,
  refreshing,
  loading,
  isFirst,
  isProfile,
  targetType,
}) => {
  const dispatch = useDispatch();
  const [allNewFeedsStoreFollowedScreen, setAllNewFeedsStoreFollowed] =
    useState([]);
  const [allNewFeedsUserFollowedScreen, setAllNewFeedsUserFollowed] = useState(
    [],
  );
  const localFollowedStore = useSelector(
    newFeedSelectors.getLocalFollowedStore,
  );
  const localFollowedUser = useSelector(newFeedSelectors.getLocalFollowedUser);

  const allNewFeedsStoreFollowed =
    localFollowedStore && localFollowedStore?.length
      ? [...allNewFeedsStoreFollowedScreen, ...localFollowedStore]
      : allNewFeedsStoreFollowedScreen;

  const allNewFeedsUserFollowed =
    localFollowedUser && localFollowedUser?.length
      ? [...allNewFeedsUserFollowedScreen, ...localFollowedUser]
      : allNewFeedsUserFollowedScreen;
  if (isFirst && loading) {
    return null;
  }

  const followStoreAction = (id) => {
    setAllNewFeedsStoreFollowed((prev) => [...prev, id]);
    if (localFollowedStore && localFollowedStore?.length) {
      if (!localFollowedStore?.includes(id)) {
        dispatch(
          newFeedActions.setLocalFollowedStore([...localFollowedStore, id]),
        );
      }
    } else {
      dispatch(newFeedActions.setLocalFollowedStore([id]));
    }
  };
  const unFollowStoreAction = (id) => {
    setAllNewFeedsStoreFollowed((prev) => {
      const itemIndex = prev?.findIndex((item) => item === id);
      if (itemIndex !== -1) {
        return [...prev.slice(0, itemIndex), ...prev.slice(itemIndex + 1)];
      } else {
        return prev;
      }
    });
    if (localFollowedStore && localFollowedStore?.length) {
      if (localFollowedStore?.includes(id)) {
        const itemIndex = localFollowedStore?.findIndex((item) => item == id);
        dispatch(
          newFeedActions.setLocalFollowedStore([
            ...localFollowedStore.slice(0, itemIndex),
            ...localFollowedStore.slice(itemIndex + 1),
          ]),
        );
      }
    }
  };
  const followUserAction = (id) => {
    setAllNewFeedsUserFollowed((prev) => [...prev, id]);
    if (localFollowedUser && localFollowedUser?.length) {
      if (!localFollowedUser?.includes(id)) {
        dispatch(
          newFeedActions.setLocalFollowedUser([...localFollowedUser, id]),
        );
      }
    } else {
      dispatch(newFeedActions.setLocalFollowedUser([id]));
    }
  };
  const unFollowUserAction = (id) => {
    setAllNewFeedsUserFollowed((prev) => {
      const itemIndex = prev?.findIndex((item) => item === id);
      if (itemIndex !== -1) {
        return [...prev.slice(0, itemIndex), ...prev.slice(itemIndex + 1)];
      } else {
        return prev;
      }
    });
    if (localFollowedUser && localFollowedUser?.length) {
      if (localFollowedUser?.includes(id)) {
        const itemIndex = localFollowedUser?.findIndex((item) => item == id);
        dispatch(
          newFeedActions.setLocalFollowedUser([
            ...localFollowedUser.slice(0, itemIndex),
            ...localFollowedUser.slice(itemIndex + 1),
          ]),
        );
      }
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
    <FlatList
      data={newFeedList?.content || []}
      keyExtractor={(item, index) =>
        'newFeedKeyExtractor' + targetType + index + item?.likeStatusOfUserLogin
      }
      renderItem={({item, index}) => (
        <FeedItem
          isProfile={isProfile}
          targetType={targetType}
          key={'newFeedItem' + targetType + index + item?.likeStatusOfUserLogin}
          newFeedItem={item}
          allNewFeedsStoreFollowed={allNewFeedsStoreFollowed}
          followStoreAction={followStoreAction}
          unFollowStoreAction={unFollowStoreAction}
          allNewFeedsUserFollowed={allNewFeedsUserFollowed}
          followUserAction={followUserAction}
          unFollowUserAction={unFollowUserAction}
        />
      )}
      onEndReached={() => handleLoadMore()}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

VerticalFeed.defaultProps = {
  isFirst: false,
  isProfile: false,
};

VerticalFeed.propTypes = {};

export default VerticalFeed;
