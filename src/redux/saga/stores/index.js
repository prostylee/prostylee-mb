import {call, put, takeLatest} from 'redux-saga/effects';
import {getTopStore} from 'services/api/storeApi';
import {storeActions, storeTypes} from 'reducers';
import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';

const getTopProduct = function* ({payload}) {
  try {
    yield put(storeActions.setLoading(true));
    const res = yield call(getTopStore, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getTopProductSuccess(res.data.data));
    } else {
      yield put(storeActions.getTopProductFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setLoading(false));
  }
};

const getListOfFuturedStores = function* ({payload}) {
  try {
    yield put(storeActions.setLoadingFuturedStores(true));
    yield put(storeActions.setPageDefault());
    const res = yield call(getTopStore, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getListOfFuturedStoreSuccess(res.data.data));
    } else {
      yield put(storeActions.getListOfFuturedStoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setLoadingFuturedStores(false));
  }
};

const loadMoreListOfFuturedStores = function* ({payload}) {
  try {
    yield put(storeActions.setLoadingLoadMoreFuturedStores(true));
    const res = yield call(getTopStore, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        storeActions.getListOfFuturedStoresLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(storeActions.getListOfFuturedStoresLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setLoadingLoadMoreFuturedStores(false));
  }
};

const watcher = function* () {
  yield takeLatest(storeTypes.GET_TOP_PRODUCT, getTopProduct);
  yield takeLatest(
    storeTypes.GET_LIST_OF_FUTURED_STORE,
    getListOfFuturedStores,
  );
  yield takeLatest(
    storeTypes.GET_LIST_OF_FUTURED_STORE_LOAD_MORE,
    loadMoreListOfFuturedStores,
  );
};
export default watcher();
