import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, View} from 'react-native';
import {AsRead, TrashIcon} from 'svg/common';
import {markReadAll, deleteAllNotification} from 'services/api/notificationApi';
import {showMessage} from 'react-native-flash-message';
import {notificationActions} from 'redux/reducers';
import i18n from 'i18n';
import styles from './styles';
import {SUCCESS, DELETE_SUCCESS} from 'constants';
const HeaderRight = () => {
  const dispatch = useDispatch();
  const onMarkReadAll = () => {
    markReadAll()
      .then((res) => {
        if (res.data.status !== 200) {
          showMessage({
            message: i18n.t('someThingWrong'),
            type: 'danger',
            position: 'top',
          });
          return;
        }
        dispatch(notificationActions.setMarkAllAsRead());
        showMessage({
          message: i18n.t('setMarkAllAsRead'),
          type: 'success',
          position: 'top',
        });
      })
      .catch(() => {
        showMessage({
          message: i18n.t('serverError'),
          type: 'danger',
          position: 'top',
        });
      });
  };
  const onDeleteAll = () => {
    deleteAllNotification()
      .then((res) => {
        if (res.data.status !== DELETE_SUCCESS) {
          showMessage({
            message: i18n.t('someThingWrong'),
            type: 'danger',
            position: 'top',
          });
          return;
        }
        dispatch(notificationActions.deleteAllNotification());
        dispatch(notificationActions.setCountUnreadNoti(0));
        showMessage({
          message: i18n.t('deleteSuccess'),
          type: 'success',
          position: 'top',
        });
      })
      .catch(() => {
        showMessage({
          message: i18n.t('serverError'),
          type: 'danger',
          position: 'top',
        });
      });
  };

  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={onDeleteAll}>
        <TrashIcon />
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 10}} onPress={onMarkReadAll}>
        <AsRead />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
