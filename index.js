/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import bgMessage from './bgMessage.js'; // <-- Import the file
import i18n from 'i18n';
import App from './App';
import {name as appName} from './app.json';
import CodePush from 'react-native-code-push';

LogBox.ignoreAllLogs();
// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () =>
  CodePush({
    updateDialog: {
      optionalInstallButtonLabel: i18n.t('codePush.installButton'),
      optionalIgnoreButtonLabel: i18n.t('codePush.IgnoreButton'),
      title: i18n.t('codePush.title'),
      optionalUpdateMessage: i18n.t('codePush.updateMessage'),
    },
    installMode: CodePush.InstallMode.IMMEDIATE,
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  })(App),
);

// New task registration
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessage,
); // <-- Add this line
