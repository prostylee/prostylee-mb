import React from 'react';

import {TYPE_USER} from 'constants';
import StoreNewFeedItem from '../NewFeedItem/StoreNewFeedItem';
import PostNewFeedItem from '../NewFeedItem/PostNewFeedItem';

const VerticalFeedItem = ({newFeedItem, targetType}) => {
  if (targetType === TYPE_USER) {
    return (
      <PostNewFeedItem newFeedItem={newFeedItem} targetType={targetType} />
    );
  }
  return <StoreNewFeedItem newFeedItem={newFeedItem} targetType={targetType} />;
};

VerticalFeedItem.defaultProps = {};

VerticalFeedItem.propTypes = {};

export default VerticalFeedItem;
