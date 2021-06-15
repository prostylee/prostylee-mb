import {call, put, takeLatest} from 'redux-saga/effects';

import {myPageActions, myPageTypes} from 'reducers';

import {SUCCESS} from 'constants';

import {
  getListProductSaleService,
  getListProductSoldService,
} from 'services/api/myPageApi';

//List product from sale
const getListProductSale = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductSaleLoading(true));
    yield put(myPageActions.setPageProductSaleDefault());
    const res = yield call(getListProductSaleService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSaleSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSaleFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListProductSaleLoading(false));
  }
};

const getLoadMoreListProductSale = function* ({payload}) {
  try {
    yield put(myPageActions.setLoadingLoadMoreProductSale(true));
    const res = yield call(getListProductSaleService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSaleLoadMoreSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSaleLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setLoadingLoadMoreProductSale(false));
  }
};

//List product from sold
const getListProductSold = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductSoldLoading(true));
    yield put(myPageActions.setPageProductSoldDefault());
    const res = yield call(getListProductSoldService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSoldSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSoldFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListProductSoldLoading(false));
  }
};

const getLoadMoreListProductSold = function* ({payload}) {
  try {
    yield put(myPageActions.setLoadingLoadMoreProductSold(true));
    const res = yield call(getListProductSoldService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSoldLoadMoreSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSoldLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setLoadingLoadMoreProductSold(false));
  }
};

const watcher = function* () {
  //List product from sale
  yield takeLatest(myPageTypes.GET_LIST_PRODUCT_SALE, getListProductSale);
  yield takeLatest(
    myPageTypes.GET_LIST_PRODUCT_SALE_LOAD_MORE,
    getLoadMoreListProductSale,
  );
  //List product from sold
  yield takeLatest(myPageTypes.GET_LIST_PRODUCT_SALE, getListProductSold);
  yield takeLatest(
    myPageTypes.GET_LIST_PRODUCT_SALE_LOAD_MORE,
    getLoadMoreListProductSold,
  );
};
export default watcher();
