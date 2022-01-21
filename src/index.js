import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  AppState,
  Alert,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {commonActions, commonSelectors, userActions} from './redux/reducers';

import {common} from './utils';

import Navigator from './navigator';

import i18n from 'i18n';

import {
  Colors,
  ModalIndicator,
  ModalNetworkWarning,
  ModalTabButton,
  SlideInModal,
  ModalAddPictureMethod,
  ModalStory,
} from 'components';

import NetInfo from '@react-native-community/netinfo';
import EStyleSheet from 'react-native-extended-stylesheet';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';

import Geocoder from 'react-native-geocoding';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './config/aws-exports';
import {GOOGLE_API_KEY} from 'config/development';
import {
  getApplicationName,
  getDeviceId,
  getDeviceName,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import RootNavigator from './navigator/rootNavigator';
import LocalStorageService from './services/LocalStorageService';
import {notificationActions} from 'redux/reducers';

import PushNotification from '@aws-amplify/pushnotification';

Geocoder.init(GOOGLE_API_KEY, {
  language: 'vi',
  components: {
    country: 'VN',
  },
});

Amplify.configure({
  ...awsconfig,
  storage: LocalStorageService,
});

PushNotification.configure(awsconfig);

EStyleSheet.build({
  ...Colors,
  $rem: common.rem,
  $smallText: 11 * common.rem,
  $normalText: 12 * common.rem,
  $mediumText: 13 * common.rem,
  $largeText: 14 * common.rem,
  $maxText: 20 * common.rem,
  $maxText2: 24 * common.rem,
  $screenWidth: common.dim.width,
  $font1: 'Inter',
  $font1Bold: 'Inter-Medium',
});

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

const Index = () => {
  const appState = React.useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // useEffect functions
  React.useEffect(() => {
    requestUserPermission(); // TODO
    onCodepushCheckForUpdateApp();
    async function getInfo() {
      const res = await getDeviceInfo();
    }

    getInfo();
  }, []);

  React.useEffect(() => {
    onCheckNetWorkStatus();
  });
  React.useEffect(() => {
    dispatch(commonActions.setIsForeground(true));
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(commonActions.setIsForeground(true));
      } else {
        dispatch(commonActions.setIsForeground(false));
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  //redux dispatch
  const dispatch = useDispatch();

  //redux state selector
  const networkStatus = useSelector((state) =>
    commonSelectors.getNetworkStatus(state),
  );
  const isShowTabButton = useSelector((state) =>
    commonSelectors.isShowTabButton(state),
  );
  const isShowAddPictureOption = useSelector((state) =>
    commonSelectors.isShowAddPictureOption(state),
  );
  const addPictureOptionTarget = useSelector((state) =>
    commonSelectors.addPictureOptionTarget(state),
  );

  // const isRequireUpdate = useSelector((state) =>
  //   commonSelectors.getRequireUpdate(state),
  // );

  const isLoading = useSelector((state) => commonSelectors.getLoading(state));

  //other functions
  const getDeviceInfo = async () => {
    const app_name = await getApplicationName();
    const device_name = await getDeviceName();
    const os_version = await getSystemVersion();
    const app_version = await getVersion();
    const device_id = await getDeviceId();
    const device_type = await getSystemName();
    const device_token = await messaging().getToken();
    return {
      app_name,
      device_name,
      os_version,
      app_version,
      device_id,
      device_type,
      device_token,
    };
  };

  const onCheckNetWorkStatus = () => {
    NetInfo.addEventListener((state) => {
      if (networkStatus !== state.isConnected) {
        dispatch(commonActions.updateNetworkStatus(state.isConnected));
      }
    });
  };

  //codepush handle
  const onCodepushCheckForUpdateApp = async () => {
    try {
      await dispatch(commonActions.toggleLoading(true));
      let isUpdate = await codePush.checkForUpdate();

      if (isUpdate) {
        await dispatch(commonActions.toggleLoading(false));
        setTimeout(async () => {
          //await dispatch(commonActions.setRequireUpdate());
        }, 300);
      } else {
        onCheckSignInSession();
      }
    } catch (err) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
      await dispatch(commonActions.toggleLoading(false));
    }
  };

  const codePushStatusDidChange = async (status) => {
    switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        onCheckSignInSession();
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        onCheckSignInSession();
        break;
      default:
        dispatch(commonActions.toggleLoading(false));
        break;
    }
  };

  const onError = (error) => {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  };

  const onDownloadProgress = (downloadProgress) => {
    if (downloadProgress) {
    }
  };

  const onHandleUpdate = async () => {
    await dispatch(commonActions.closeRequireUpdate());
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      onDownloadProgress,
      onError,
    );
  };

  const onCheckSignInSession = async () => {
    await dispatch(commonActions.toggleLoading(true));
    Auth.currentAuthenticatedUser()
      .then((data) => {
        dispatch(userActions.userSignInSuccess(data));
        dispatch(commonActions.toggleLoading(false));
      })
      .catch(() => {
        Auth.signOut({global: true});
        dispatch(userActions.userClearExpiredToken());
        dispatch(commonActions.toggleLoading(false));
      });
  };

  // Refer https://rnfirebase.io/messaging/usage
  // Notification Permission
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await onReceiveMessage();
    }
  };

  /**
   * Foreground state messages.
   *
   * When the application is open and in view.
   */
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Alert.alert('A new FCM message arrived!' + JSON.stringify(remoteMessage));
    });

    /**
     * Background & Quit state messages
     *
     * When the application is open, however in the background (minimised).
     * This typically occurs when the user has pressed the "home" button on the device or has switched to another app via the app switcher.
     */
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      // Alert.alert(
      //   'Message handled in the background!' + JSON.stringify(remoteMessage),
      // );
    });

    return unsubscribe;
  }, []);

  const onReceiveMessage = async () => {
    const token = await messaging().getToken();
    console.log('token', token);

    // TODO get device info and should only call once
    dispatch(
      notificationActions.subscribePushNotification({
        token,
        deviceName: 'Android Simulator',
        deviceId: 'ID01',
        software: 'Android',
        osVersion: 'Android 11',
        osName: 'Android',
        brand: 'Samsung',
        manufacturer: 'Korea',
        modelName: '2021',
      }),
    );
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle={'dark-content'} />}
      <Navigator />
      <FlashMessage
        position="bottom"
        titleStyle={styles.textMessage}
        floating={true}
      />
      <ModalTabButton visible={isShowTabButton} />
      <ModalAddPictureMethod
        visible={isShowAddPictureOption}
        target={addPictureOptionTarget}
      />
      <ModalIndicator visible={isLoading} />
      <ModalStory />
      {/* <ModalRequireUpdate
        visible={isRequireUpdate}
        onConfirm={() => onHandleUpdate()}
      /> */}
      <ModalNetworkWarning visible={!networkStatus} />
      <SlideInModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textMessage: {textAlign: 'center'},
});

export default codePush(codePushOptions)(Index);
