import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';

import Index from './src';

import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Index />
      </PaperProvider>
    </Provider>
  );
};
export default App;
