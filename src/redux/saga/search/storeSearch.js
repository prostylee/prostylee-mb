import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getStoreResultsApi,
  getStoreBestSellerProduct,
} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getStoreSearch = function* ({payload}) {
  try {
    yield put(searchActions.setStoreSearchLoading(true));
    const res = yield call(getStoreResultsApi, payload);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getStoreSearchSuccess(listStore));
    } else {
      yield put(searchActions.getStoreSearchFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setStoreSearchLoading(false));
  }
};
const getStoreSearchLoadMore = function* ({payload}) {
  try {
    yield put(searchActions.setStoreSearchLoadmoreLoading(true));
    const res = yield call(getStoreearchResultsApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getStoreSearchLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(searchActions.getStoreSearchLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setStoreSearchLoadmoreLoading(false));
  }
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(searchTypes.GET_STORE_SEARCH, getStoreSearch);
  yield takeLatest(
    searchTypes.GET_STORE_SEARCH_LOADMORE,
    getStoreSearchLoadMore,
  );
};
export default watcher();
