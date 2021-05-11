/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import bgMessage from './bgMessage.js'; // <-- Import the file
import App from './App';
import {name as appName} from './app.json';
import CodePush from 'react-native-code-push';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () =>
  CodePush({
    updateDialog: {
      optionalInstallButtonLabel: 'Cập nhật',
      optionalIgnoreButtonLabel: 'Bỏ qua',
      title: 'Thông Báo',
      optionalUpdateMessage: 'Có phiên bản mới, nhấn cài đặt để cập nhật.',
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
