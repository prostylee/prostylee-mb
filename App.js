import React from 'react';
import store from './src/store';
import {Provider} from 'react-redux';

import Index from './src';

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};
export default App;
