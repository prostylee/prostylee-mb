import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {dataActions, dataSelectors, userActions} from './reducers';

import {rem, screenWidth} from './utils';

import Navigator from './navigator';

import AsyncStorage from './data/AsyncStorage';

import {
  ModalIndicator,
  ModalRequireUpdate,
  ModalNetworkWarning,
  Colors,
} from 'components';

import * as RootNavigator from 'navigator/rootNavigator';

import NetInfo from '@react-native-community/netinfo';
import EStyleSheet from 'react-native-extended-stylesheet';
import FlashMessage from 'react-native-flash-message';
// import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
// import NotificationPopup from 'react-native-push-notification-popup';

import {
  getSystemName,
  getDeviceId,
  getDeviceName,
  getSystemVersion,
  getVersion,
  getApplicationName,
} from 'react-native-device-info';

EStyleSheet.build({
  ...Colors,
  $rem: rem,
  $smallText: 11 * rem,
  $normalText: 12 * rem,
  $mediumText: 13 * rem,
  $largeText: 14 * rem,
  $maxText: 20 * rem,
  $screenWidth: screenWidth,
  $font1: 'Arial',
});

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.MANUAL,
// };

const Index = () => {
  // useEffect functions
  React.useEffect(() => {
    // requestUserPermission();
    // onCodepushCheckForUpdateApp();
    async function getInfo() {
      const res = await getDeviceInfo();
      // console.log(res);
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
    dataSelectors.getNetworkStatus(state),
  );

  // const isRequireUpdate = useSelector((state) =>
  //   dataSelectors.getRequireUpdate(state),
  // );

  const isLoading = useSelector((state) => dataSelectors.getLoading(state));

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
        dispatch(dataActions.updateNetworkStatus(state.isConnected));
      }
    });
  };

  //   //codepush handle
  //   const onCodepushCheckForUpdateApp = async () => {
  //     try {
  //       await dispatch(dataActions.toggleLoading(true));
  //       let isUpdate = await codePush.checkForUpdate();
  //       console.log('CHECKING FOR UPDATE APP...');
  //       if (isUpdate) {
  //         console.log('has new version');
  //         await dispatch(dataActions.toggleLoading(false));
  //         setTimeout(async () => {
  //           await dispatch(dataActions.setRequireUpdate());
  //         }, 300);
  //       } else {
  //         console.log('APP IS UP TO DATE');
  //         onCheckLoginSession();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       await dispatch(dataActions.toggleLoading(false));
  //     }
  //   };

  //   const codePushStatusDidChange = async (status) => {
  //     switch (status) {
  //       case codePush.SyncStatus.DOWNLOADING_PACKAGE:
  //         console.log('Downloading package.');
  //         break;
  //       case codePush.SyncStatus.INSTALLING_UPDATE:
  //         console.log('Installing update.');
  //         break;
  //       case codePush.SyncStatus.UP_TO_DATE:
  //         console.log('Up-to-date.');
  //         onCheckLoginSession();
  //         break;
  //       case codePush.SyncStatus.UPDATE_INSTALLED:
  //         console.log('Update installed.');
  //         onCheckLoginSession();
  //         break;
  //       default:
  //         dispatch(dataActions.toggleLoading(false));
  //         break;
  //     }
  //   };

  //   const onError = (error) => {
  //     console.log('Codepush: An error occurred. ' + error);
  //   };

  //   const onDownloadProgress = (downloadProgress) => {
  //     if (downloadProgress) {
  //       console.log('Downloading ' + downloadProgress.receivedBytes);
  //     }
  //   };

  //   const onHandleUpdate = async () => {
  //     await dispatch(dataActions.closeRequireUpdate());
  //     codePush.sync(
  //       {
  //         installMode: codePush.InstallMode.IMMEDIATE,
  //       },
  //       codePushStatusDidChange,
  //       onDownloadProgress,
  //       onError,
  //     );
  //   };

  //   const onCheckLoginSession = async () => {
  //     const token = await AsyncStorage.getUserToken();
  //     const userInfo = await AsyncStorage.getUserData();
  //     if (token && userInfo) {
  //       dispatch(
  //         userActions.getUserInfo({
  //           token,
  //           onSuccess: (data) => onFinishedGetUserInfo(data),
  //         }),
  //       );
  //     } else {
  //       dispatch(dataActions.toggleLoading(false));
  //     }
  //   };

  //   const onFinishedGetUserInfo = async (data) => {
  //     if (data.role_id !== 3) {
  //       await messaging()
  //         .subscribeToTopic('user_all')
  //         .then(async () => {
  //           console.log('Subscribed to topic all!');
  //         });
  //     }
  //     await messaging()
  //       .subscribeToTopic(`user_${data.id}`)
  //       .then(async () => {
  //         setTimeout(async () => {
  //           dispatch(userActions.getUserInfoSuccess(data));
  //           dispatch(dataActions.toggleLoading(false));
  //         }, 300);
  //         console.log('Subscribed to topic user!');
  //       });
  //   };

  return (
    <View style={styles.container}>
      <Navigator />
      <FlashMessage
        position="bottom"
        titleStyle={styles.textMessage}
        floating={true}
      />
      <ModalIndicator visible={isLoading} />
      {/* <ModalRequireUpdate
        visible={isRequireUpdate}
        onConfirm={() => onHandleUpdate()}
      /> */}
      <ModalNetworkWarning visible={!networkStatus} />
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

export default Index;

// export default codePush(codePushOptions)(Index);
