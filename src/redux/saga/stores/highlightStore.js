import {call, put, takeLatest} from 'redux-saga/effects';

import {getHighlightStoreList} from 'services/api/storeApi';

import {storeActions, storeTypes} from 'reducers';

import {SUCCESS} from 'constants';

import {showMessage} from 'react-native-flash-message';

import i18n from 'i18n';

const getHighlightStore = function* ({payload}) {
  const data = {...payload};
  try {
    yield put(storeActions.setHighlightStoreLoading(true));
    const res = yield call(getHighlightStoreList, data);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getHighlightStoreSuccess(listStore));
    } else {
      yield put(storeActions.getHighlightStoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setHighlightStoreLoading(false));
  }
};
const getHighlightStoreLoadmore = function* ({payload}) {
  const data = {...payload};
  data.storeId = 'USER';
  try {
    yield put(storeActions.setHighlightStoreLoadmoreLoading(true));
    const res = yield call(getHighlightStoreList, data);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getHighlightStoreLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getHighlightStoreLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setHighlightStoreLoadmoreLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(storeTypes.GET_HIGHLIGHT_STORE, getHighlightStore);
  yield takeLatest(
    storeTypes.GET_HIGHLIGHT_STORE_LOADMORE,
    getHighlightStoreLoadmore,
  );
};
export default watcher();
