import React from 'react';

import GridView from './gridView';

const StoreTab = ({index}) => {
  if (index === 0) {
    return null;
  }
  return <GridView />;
};

export default StoreTab;
