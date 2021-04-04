import React from 'react';
import {useSelector} from 'react-redux';

import VerticalFeed from 'screens/NewFeed/VerticalFeed';

import {postOfUserSlector} from 'redux/selectors/user';

import {TYPE_USER} from 'constants';

const FullView = () => {
  const postOfUser = useSelector((state) => postOfUserSlector(state));
  return (
    <VerticalFeed
      targetType={TYPE_USER}
      loading={() => {}}
      handleRefresh={() => {}}
      handleLoadMore={() => {}}
      newFeedList={postOfUser}
      refreshing={false}
      isProfile
      loadMoreLoading={false}
    />
  );
};

export default FullView;
