import React from 'react';
import {useSelector} from 'react-redux';

import GridView from './gridView';
import FullView from './fullView';

import {isFullViewSelector} from 'redux/selectors/common';

const StoreTab = ({index}) => {
  const isFullView = useSelector((state) => isFullViewSelector(state));
  if (index === 0) {
    return null;
  }
  return isFullView ? <FullView /> : <GridView />;
};

export default StoreTab;
