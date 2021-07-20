import React, {useEffect} from 'react';
import {disableLogBox} from './src/utils/logBox';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Index from './src';

import messaging from '@react-native-firebase/messaging';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
const theme = {
  ...DefaultTheme,
};
const App = () => {
  useEffect(() => {
    disableLogBox();
    (async function requestUserPermission() {
      console.log('REQUEST PER');
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    })();

    messaging()
      .getToken()
      .then((res) => console.log('FCM TOKEN', res))
      .catch((error) => console.log('GET FCM TOKEN ERORR', er));
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
