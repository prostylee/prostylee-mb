import React from 'react';

import {TYPE_USER} from 'constants';
import StoreNewFeedItem from '../NewFeedItem/StoreNewFeedItem';
import PostNewFeedItem from '../NewFeedItem/PostNewFeedItem';

const VerticalFeedItem = ({
  showHeader = true,
  showFollowText = true,
  newFeedItem,
  targetType,
  allNewFeedsStoreFollowed = [],
  followStoreAction = () => {},
  unFollowStoreAction = () => {},
  allNewFeedsUserFollowed = [],
  followUserAction = () => {},
  unFollowUserAction = () => {},
}) => {
  if (targetType === TYPE_USER) {
    return (
      <PostNewFeedItem
        showHeader={showHeader}
        showFollowText={showFollowText}
        newFeedItem={newFeedItem}
        targetType={targetType}
        allNewFeedsFollowed={allNewFeedsUserFollowed}
        addFollowAction={followUserAction}
        removeFollowAction={unFollowUserAction}
      />
    );
  }
  return (
    <StoreNewFeedItem
      showFollowText={showFollowText}
      newFeedItem={newFeedItem}
      targetType={targetType}
      allNewFeedsFollowed={allNewFeedsStoreFollowed}
      addFollowAction={followStoreAction}
      removeFollowAction={unFollowStoreAction}
    />
  );
};

VerticalFeedItem.defaultProps = {};

VerticalFeedItem.propTypes = {};

export default VerticalFeedItem;
