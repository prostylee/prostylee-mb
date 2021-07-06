import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getListNotificationService,
  getListNotificationDiscountService,
  countNotification,
} from 'services/api/notificationApi';

import {notificationActions, notificationTypes} from 'reducers';

import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';

//List LIST_NOTIFICATION
const getListNotification = function* ({payload}) {
  try {
    yield put(notificationActions.setListNotificationLoading(true));
    yield put(notificationActions.setPageListNotificationDefault());
    const res = yield call(getListNotificationService, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(notificationActions.getListNotificationSuccess(res.data.data));
    } else {
      yield put(notificationActions.getListNotificationFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(notificationActions.setListNotificationLoading(false));
  }
};

const getLoadMoreListNotification = function* ({payload}) {
  try {
    yield put(notificationActions.setListNotificationLoadingLoadMore(true));
    const res = yield call(getListNotificationService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        notificationActions.getListNotificationLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(notificationActions.getListNotificationLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(notificationActions.setListNotificationLoadingLoadMore(false));
  }
};

//List notification discount
const getListNotificationDiscount = function* ({payload}) {
  try {
    yield put(notificationActions.setListNotificationDiscountLoading(true));
    yield put(notificationActions.setPageListNotificationDiscountDefault());
    const res = yield call(getListNotificationDiscountService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        notificationActions.getListNotificationDiscountSuccess(res.data.data),
      );
    } else {
      yield put(notificationActions.getListNotificationDiscountFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(notificationActions.setListNotificationDiscountLoading(false));
  }
};

const getLoadMoreListNotificationDiscount = function* ({payload}) {
  try {
    yield put(
      notificationActions.setListNotificationDiscountLoadingLoadMore(true),
    );
    const res = yield call(getListNotificationDiscountService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        notificationActions.getListNotificationDiscountLoadMoreSuccess(
          res.data.data,
        ),
      );
    } else {
      yield put(
        notificationActions.getListNotificationDiscountLoadMoreFailed(),
      );
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(
      notificationActions.setListNotificationDiscountLoadingLoadMore(false),
    );
  }
};
const getCountUnreadNoti = function* ({payload}) {
  try {
    const res = yield call(countNotification, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(notificationActions.setCountUnreadNoti(res.data.data?.data));
    } else {
      yield put(notificationActions.setCountUnreadNoti(0));
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
    notificationActions.setCountUnreadNoti(0);
  }
};
const watcher = function* () {
  //List LIST_NOTIFICATION
  yield takeLatest(
    notificationTypes.GET_LIST_NOTIFICATION,
    getListNotification,
  );
  yield takeLatest(
    notificationTypes.GET_LIST_NOTIFICATION_LOAD_MORE,
    getLoadMoreListNotification,
  );

  //List LIST_NOTIFICATION
  yield takeLatest(
    notificationTypes.GET_LIST_NOTIFICATION_DISCOUNT,
    getListNotificationDiscount,
  );
  yield takeLatest(
    notificationTypes.GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE,
    getLoadMoreListNotificationDiscount,
  );
  yield takeLatest(notificationTypes.GET_COUNT_UNREAD_NOTI, getCountUnreadNoti);
};
export default watcher();
