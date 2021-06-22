import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {AsRead} from 'svg/common';
import {markReadAll} from 'services/api/notificationApi';
import {showMessage} from 'react-native-flash-message';
import {notificationActions} from 'redux/reducers';
import i18n from 'i18n';

const HeaderRight = () => {
  const dispatch = useDispatch();
  const onMarkReadAll = () => {
    markReadAll()
      .then((res) => {
        console.log('RESSS', res);
        if (res.status !== 200) {
          showMessage({
            message: i18n.t('someThingWrong'),
            type: 'danger',
          });
          return;
        }
        dispatch(notificationActions.setMarkAllAsRead());
        showMessage({
          message: i18n.t('setMarkAllAsRead'),
          type: 'success',
        });
      })
      .catch(() => {
        showMessage({
          message: i18n.t('serverError'),
          type: 'danger',
        });
      });
  };

  return (
    <TouchableOpacity onPress={onMarkReadAll}>
      <AsRead />
    </TouchableOpacity>
  );
};

export default HeaderRight;
