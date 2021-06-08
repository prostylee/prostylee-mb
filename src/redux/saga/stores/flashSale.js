import {call, put, takeLatest} from 'redux-saga/effects';

import {getFlashSale as getFlashSaleApi} from 'services/api/storeApi';

import {storeActions, storeTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getFlashSale = function* ({payload}) {
  try {
    yield put(storeActions.setNearbyStoreLoading(true));
    const res = yield call(getFlashSaleApi, payload);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getFlashSaleSuccess(listStore));
    } else {
      yield put(storeActions.getFlashSaleFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setNearbyStoreLoading(false));
  }
};
const getFlashSaleLoadmore = function* ({payload}) {
  try {
    yield put(storeActions.setNearbyStoreLoadmoreLoading(true));
    const res = yield call(getFlashSaleApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getFlashSaleLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getFlashSaleLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setNearbyStoreLoadmoreLoading(false));
  }
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(storeTypes.GET_FLASH_SALE, getFlashSale);
  yield takeLatest(storeTypes.GET_FLASH_SALE_LOADMORE, getFlashSaleLoadmore);
};
export default watcher();
