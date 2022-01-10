import React from 'react';

import Grid from './grid';

const MeTab = ({index, userProfile}) => {
  if (index === 1) {
    return null;
  }
  return <Grid userProfile={userProfile} />;
};

export default MeTab;
