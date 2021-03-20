import React from 'react';
import {useSelector} from 'react-redux';

import GridView from './gridView';
import FullView from './fullView';

import {isFullViewSelector} from 'redux/selectors/common';

const StoreTab = () => {
  const isFullView = useSelector((state) => isFullViewSelector(state));
  return isFullView ? <FullView /> : <GridView />;
};

export default StoreTab;
