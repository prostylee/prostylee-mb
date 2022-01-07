import React from 'react';

import Grid from './grid';

const MeTab = ({index}) => {
  if (index === 1) {
    return null;
  }
  return <Grid />;
};

export default MeTab;
