/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import bgMessage from './bgMessage.js'; // <-- Import the file
import i18n from 'i18n';
import App from './App';
import {name as appName} from './app.json';
import CodePush from 'react-native-code-push';
import 'react-native-gesture-handler';

LogBox.ignoreAllLogs();
// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => App);

// New task registration
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessage,
); // <-- Add this line
