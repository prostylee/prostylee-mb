import {call, put, takeLatest} from 'redux-saga/effects';

import {getNearbyStore as getNearbyStoreApi} from 'services/api/storeApi';

import {storeActions, storeTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getNearbyStore = function* ({payload}) {
  try {
    yield put(storeActions.setNearbyStoreLoading(true));
    const res = yield call(getNearbyStoreApi, payload);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getNearbyStoreSuccess(listStore));
    } else {
      yield put(storeActions.getNearbyStoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setNearbyStoreLoading(false));
  }
};
const getNearbyStoreLoadmore = function* ({payload}) {
  try {
    yield put(storeActions.setNearbyStoreLoadmoreLoading(true));
    const res = yield call(getNearbyStoreApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getNearbyStoreLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getNearbyStoreLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setNearbyStoreLoadmoreLoading(false));
  }
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(storeTypes.GET_NEARBY_STORE, getNearbyStore);
  yield takeLatest(
    storeTypes.GET_NEARBY_STORE_LOADMORE,
    getNearbyStoreLoadmore,
  );
};
export default watcher();
