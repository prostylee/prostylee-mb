import React, {useEffect} from 'react';
import {disableLogBox} from './src/utils/logBox';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Index from './src';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
const theme = {
  ...DefaultTheme,
};
const App = () => {
  useEffect(() => {
    disableLogBox();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Index />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
