import {call, put, takeLatest} from 'redux-saga/effects';

import {getProductSearchResultsApi} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getProductSearch = function* ({payload}) {
  try {
    yield put(searchActions.setProductsSearchLoading(true));
    const res = yield call(getProductSearchResultsApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getProductsSearchSuccess(res?.data?.data));
    } else {
      yield put(searchActions.getProductsSearchFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setProductsSearchLoading(false));
  }
};
const getProductSearchLoadMore = function* ({payload}) {
  try {
    yield put(searchActions.setProductsSearchLoadmoreLoading(true));
    const res = yield call(getProductSearchResultsApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchActions.getProductsSearchLoadmoreSuccess(res?.data?.data),
      );
    } else {
      yield put(searchActions.getProductsSearchLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setProductsSearchLoadmoreLoading(false));
  }
};

const watcher = function* () {
  //List PRODUCT_SEARCH
  yield takeLatest(searchTypes.GET_PRODUCTS_SEARCH, getProductSearch);
  yield takeLatest(
    searchTypes.GET_PRODUCTS_SEARCH_LOADMORE,
    getProductSearchLoadMore,
  );
};
export default watcher();
