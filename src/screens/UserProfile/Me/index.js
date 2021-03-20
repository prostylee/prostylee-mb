import React from 'react';
import {useSelector} from 'react-redux';

import Grid from './grid';
import Full from './fullView';

import {isFullViewSelector} from 'redux/selectors/common';

const MeTab = ({index}) => {
  const isFullView = useSelector((state) => isFullViewSelector(state));
  if (index === 1) {
    return null;
  }
  return isFullView ? <Full /> : <Grid />;
};

export default MeTab;
