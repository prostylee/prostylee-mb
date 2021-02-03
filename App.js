import React from 'react';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Index from './src';

import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Index />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
