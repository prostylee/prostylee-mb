import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  return Promise.resolve();
});
