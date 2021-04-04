import React from 'react';
import {useSelector} from 'react-redux';

import VerticalFeed from 'screens/NewFeed/VerticalFeed';

import {productByUserSelector} from 'redux/selectors/user';

import {TYPE_USER} from 'constants';

const FullView = () => {
  const productByUser = useSelector((state) => productByUserSelector(state));
  return (
    <VerticalFeed
      targetType={TYPE_USER}
      loading={() => {}}
      handleRefresh={() => {}}
      handleLoadMore={() => {}}
      newFeedList={productByUser}
      refreshing={false}
      isProfile
      loadMoreLoading={false}
    />
  );
};

export default FullView;
