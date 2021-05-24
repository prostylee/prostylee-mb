/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import bgMessage from './bgMessage.js'; // <-- Import the file
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);

// New task registration
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessage,
); // <-- Add this line
