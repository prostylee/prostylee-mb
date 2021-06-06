import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {AsRead} from 'svg/common';
import {markReadAll} from 'services/api/notificationApi';
import {showMessage} from 'react-native-flash-message';
import {notificationActions} from 'redux/reducers';

const HeaderRight = () => {
  const dispatch = useDispatch();
  const onMarkReadAll = () => {
    markReadAll()
      .then((res) => {
        if (res.status !== 200) {
          showMessage({
            message: `Có lỗi xảy ra, vui lòng thử lại sau`,
            type: 'danger',
          });
          return;
        }
        dispatch(notificationActions.setMarkAllAsRead());
        showMessage({
          message: `Đã đánh dấu tất cả là đã đọc`,
          type: 'success',
        });
      })
      .catch(() => {
        showMessage({
          message: `Lỗi hệ thống`,
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
