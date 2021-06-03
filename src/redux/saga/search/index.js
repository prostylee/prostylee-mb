import {call, put, takeLatest} from 'redux-saga/effects';

import {getListFeaturedCategoriesService} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List product from categories
const getSearchFeaturedCategories = function* ({payload}) {
  try {
    yield put(searchActions.setSearchFeaturedCategoriesLoading(true));
    yield put(searchActions.setPageSearchFeaturedCategoriesDefault());
    const res = yield call(getListFeaturedCategoriesService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchActions.getSearchFeaturedCategoriesSuccess(res.data.data),
      );
    } else {
      yield put(searchActions.getSearchFeaturedCategoriesFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setSearchFeaturedCategoriesLoading(false));
  }
};

const getLoadMoreSearchFeaturedCategories = function* ({payload}) {
  try {
    yield put(searchActions.setSearchFeaturedCategoriesLoadingLoadMore(true));
    const res = yield call(getListFeaturedCategoriesService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchActions.getSearchFeaturedCategoriesLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(searchActions.getSearchFeaturedCategoriesLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setSearchFeaturedCategoriesLoadingLoadMore(false));
  }
};

const watcher = function* () {
  //List SEARCH_FEATURED_CATEGORIES
  yield takeLatest(
    searchTypes.GET_SEARCH_FEATURED_CATEGORIES,
    getSearchFeaturedCategories,
  );
  yield takeLatest(
    searchTypes.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE,
    getLoadMoreSearchFeaturedCategories,
  );
};
export default watcher();
