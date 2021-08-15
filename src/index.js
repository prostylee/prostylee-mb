import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';

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

import {PushNotificationIOS} from '@react-native-community/push-notification-ios';

import Geocoder from 'react-native-geocoding';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './config/aws-exports';
import {GOOGLE_API_KEY} from 'config/development';
// import NotificationPopup from 'react-native-push-notification-popup';
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
  // useEffect functions
  React.useEffect(() => {
    requestUserPermission();
    onCodepushCheckForUpdateApp();
    async function getInfo() {
      const res = await getDeviceInfo();
    }

    getInfo();
  }, []);

  React.useEffect(() => {
    onCheckNetWorkStatus();
  });

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
      .catch((err) => {
        Auth.signOut({global: true});

        dispatch(userActions.userClearExpiredToken());
        RootNavigator.navigate('SignInOptions');
        dispatch(commonActions.toggleLoading(false));
      });
  };

  // Notification Permission
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      onReceiveMessage();
    }
  };

  const onReceiveMessage = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
    //notification arrived when app on foreground state
    messaging().onMessage(async (remoteMessage) => {
      console.log('foreground remoteMessage', remoteMessage);
      if (
        remoteMessage.data.type &&
        remoteMessage.data.type === 'notification'
      ) {
        //do something here
        //.........
      } else if (
        remoteMessage.data.type &&
        remoteMessage.data.type === 'message' &&
        remoteMessage.data.user
      ) {
        //do something here
        //.........
      } else if (
        remoteMessage.data.type &&
        remoteMessage.data.type === 'message' &&
        !remoteMessage.data.user
      ) {
        //do something here
        //.........
      } else {
        //do something here
        //.........
      }
    });

    //notification was opened when app on background state
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('background remoteMessage', remoteMessage);
      if (
        remoteMessage.data.type &&
        remoteMessage.data.type === 'notification'
      ) {
        //do something here
        //.........
      } else if (
        remoteMessage.data.type &&
        remoteMessage.data.type === 'message' &&
        remoteMessage.data.user
      ) {
        //do something here
        //.........
      } else if (
        remoteMessage.data.type &&
        remoteMessage.data.type === 'message' &&
        !remoteMessage.data.user
      ) {
        //do something here
        //.........
      } else {
        //do something here
        //.........
      }
    });

    //notification was opened when app on quite state
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        console.log('open app remoteMessage', remoteMessage);
        if (remoteMessage) {
          if (
            remoteMessage.data.type &&
            remoteMessage.data.type === 'notification'
          ) {
            //do something here
            //.........
          } else if (
            remoteMessage.data.type &&
            remoteMessage.data.type === 'message' &&
            remoteMessage.data.user
          ) {
            //do something here
            //.........
          } else if (
            remoteMessage.data.type &&
            remoteMessage.data.type === 'message' &&
            !remoteMessage.data.user
          ) {
            //do something here
            //.........
          } else {
            //do something here
            //.........
          }
        }
      });
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
      {/* <NotificationPopup
        ref={(ref) => {
          this.popup = ref;
        }}
      /> */}
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
