import React from 'react';
import store from './src/store';
import {Provider} from 'react-redux';

import Index from './src';

import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={PaperDarkTheme}>
        <Index />
      </PaperProvider>
    </Provider>
  );
};
export default App;
