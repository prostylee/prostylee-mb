import {call, put, takeLatest} from 'redux-saga/effects';

import {getPersonalSalersProducts as getPersonalSalersProductsApi} from 'services/api/storeApi';

import {storeActions, storeTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getPersonalSalersProducts = function* ({payload}) {
  try {
    yield put(storeActions.setPersonalSalersLoading(true));
    const res = yield call(getPersonalSalersProductsApi, payload);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getPersonalSalersSuccess(listStore));
    } else {
      yield put(storeActions.getPersonalSalersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setPersonalSalersLoading(false));
  }
};
const getPersonalSalersProductsLoadmore = function* ({payload}) {
  try {
    yield put(storeActions.setPersonalSalersLoadmoreLoading(true));
    const res = yield call(getPersonalSalersProductsApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getPersonalSalersLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getPersonalSalersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setPersonalSalersLoadmoreLoading(false));
  }
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(storeTypes.GET_PERSONAL_SALERS, getPersonalSalersProducts);
  yield takeLatest(
    storeTypes.GET_PERSONAL_SALERS_LOADMORE,
    getPersonalSalersProductsLoadmore,
  );
};
export default watcher();
