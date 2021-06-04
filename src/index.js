import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {commonActions, commonSelectors, userActions} from './redux/reducers';

import {common} from './utils';

import Navigator from './navigator';

import {
  Colors,
  ModalIndicator,
  ModalNetworkWarning,
  ModalTabButton,
  SlideInModal,
  ModalAddPictureMethod,
} from 'components';

import NetInfo from '@react-native-community/netinfo';
import EStyleSheet from 'react-native-extended-stylesheet';
import FlashMessage from 'react-native-flash-message';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './config/aws-exports';

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
      console.log(res);
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
      console.log('CHECKING FOR UPDATE APP...');
      if (isUpdate) {
        console.log('has new version');
        await dispatch(commonActions.toggleLoading(false));
        setTimeout(async () => {
          await dispatch(commonActions.setRequireUpdate());
        }, 300);
      } else {
        console.log('APP IS UP TO DATE');
        onCheckSignInSession();
      }
    } catch (err) {
      console.log(err);
      await dispatch(commonActions.toggleLoading(false));
    }
  };

  const codePushStatusDidChange = async (status) => {
    switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        onCheckSignInSession();
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        onCheckSignInSession();
        break;
      default:
        dispatch(commonActions.toggleLoading(false));
        break;
    }
  };

  const onError = (error) => {
    console.log('Codepush: An error occurred. ' + error);
  };

  const onDownloadProgress = (downloadProgress) => {
    if (downloadProgress) {
      console.log('Downloading ' + downloadProgress.receivedBytes);
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
        console.log('Already sign-in');
        dispatch(userActions.userSignInSuccess(data));
        dispatch(commonActions.toggleLoading(false));
      })
      .catch((err) => {
        console.log('Not sign-in yet!!!');
        console.log(err);
        Auth.signOut({global: true});

        dispatch(userActions.userClearExpiredToken());
        RootNavigator.navigate('SignInOptions');
        dispatch(commonActions.toggleLoading(false));
      });
  };

  //firebase Message
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      onReceiveMessage();
    }
  };

  const onReceiveMessage = async () => {
    //notification arrived when app on foreground state
    messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

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
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
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
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
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
      <Navigator />
      <FlashMessage
        position="bottom"
        titleStyle={styles.textMessage}
        floating={true}
      />
      <ModalTabButton visible={isShowTabButton} />
      <ModalAddPictureMethod visible={isShowAddPictureOption} />
      <ModalIndicator visible={isLoading} />
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
