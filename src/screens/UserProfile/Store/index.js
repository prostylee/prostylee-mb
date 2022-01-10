import React from 'react';

import GridView from './gridView';

const StoreTab = ({index, userProfile}) => {
  if (index === 0) {
    return null;
  }
  return <GridView userProfile={userProfile} />;
};

export default StoreTab;
