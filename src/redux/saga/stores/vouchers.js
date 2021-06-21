import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getVouchers as getVouchersApi,
  postSaveVouchers as postSaveVouchersApi,
} from 'services/api/storeApi';

import {storeActions, storeTypes} from 'reducers';

import {SUCCESS, POST_SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getVouchers = function* ({payload}) {
  try {
    yield put(storeActions.setVouchersLoading(true));
    const res = yield call(getVouchersApi, payload);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getVouchersSuccess(listStore));
    } else {
      yield put(storeActions.getVouchersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setVouchersLoading(false));
  }
};
const getVouchersLoadmore = function* ({payload}) {
  try {
    yield put(storeActions.setVouchersLoadmoreLoading(true));
    const res = yield call(getVouchersApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getVouchersLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getVouchersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setVouchersLoadmoreLoading(false));
  }
};

const postSaveVoucher = function* ({payload}) {
  try {
    //yield put(storeActions.setVouchersLoadmoreLoading(true));
    const res = yield call(postSaveVouchersApi, payload);
    if (res.ok && res.data.status === POST_SUCCESS && !res.data.error) {
      yield put(storeActions.postSaveVoucherSuccess(payload));
    } else {
      yield put(storeActions.postSaveVoucherFailed());
    }
  } catch (e) {
    console.error(e);
  }
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(storeTypes.GET_VOUCHERS, getVouchers);
  yield takeLatest(storeTypes.GET_VOUCHERS_LOADMORE, getVouchersLoadmore);
  yield takeLatest(storeTypes.POST_SAVE_VOUCHER, postSaveVoucher);
};
export default watcher();
