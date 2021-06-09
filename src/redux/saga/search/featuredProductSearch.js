import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getSuggestionsSearchService,
  getFeaturedProductSearchApi,
} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH
const getFeaturedProductSearch = function* ({payload}) {
  try {
    yield put(searchActions.setFeaturedProductSearchLoading(true));
    yield put(searchActions.setPageFeaturedProductSearchDefault());
    const res = yield call(getFeaturedProductSearchApi, payload);
    console.log('FEATURED PRODUCT SEARCH', res);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getFeaturedProductSearchSuccess(res.data.data));
    } else {
      yield put(searchActions.getFeaturedProductSearchFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setFeaturedProductSearchLoading(false));
  }
};

const getLoadMoreFeaturedProductSearch = function* ({payload}) {
  try {
    yield put(searchActions.setFeaturedProductSearchLoadingLoadMore(true));
    const res = yield call(getSuggestionsSearchService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchActions.getFeaturedProductSearchLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(searchActions.getFeaturedProductSearchLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setFeaturedProductSearchLoadingLoadMore(false));
  }
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(
    searchTypes.GET_FEATURED_PRODUCT_SEARCH,
    getFeaturedProductSearch,
  );
  yield takeLatest(
    searchTypes.GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE,
    getLoadMoreFeaturedProductSearch,
  );
};
export default watcher();
