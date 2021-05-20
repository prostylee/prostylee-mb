import {call, put, takeLatest} from 'redux-saga/effects';

import {getListFeaturedCategoriesService} from 'services/searchApi';

import {
  searchFeaturedCategoriesActions,
  searchFeaturedCategoriesTypes,
} from 'reducers';

import {SUCCESS} from 'constants';

//List product from categories
const getSearchFeaturedCategories = function* ({payload}) {
  try {
    yield put(
      searchFeaturedCategoriesActions.setSearchFeaturedCategoriesLoading(true),
    );
    yield put(
      searchFeaturedCategoriesActions.setPageSearchFeaturedCategoriesDefault(),
    );
    const res = yield call(getListFeaturedCategoriesService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchFeaturedCategoriesActions.getSearchFeaturedCategoriesSuccess(
          res.data.data,
        ),
      );
    } else {
      yield put(
        searchFeaturedCategoriesActions.getSearchFeaturedCategoriesFailed(),
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(
      searchFeaturedCategoriesActions.setSearchFeaturedCategoriesLoading(false),
    );
  }
};

const getLoadMoreSearchFeaturedCategories = function* ({payload}) {
  try {
    yield put(
      searchFeaturedCategoriesActions.setSearchFeaturedCategoriesLoadingLoadMore(
        true,
      ),
    );
    const res = yield call(getListFeaturedCategoriesService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchFeaturedCategoriesActions.getSearchFeaturedCategoriesLoadMoreSuccess(
          res.data.data,
        ),
      );
    } else {
      yield put(
        searchFeaturedCategoriesActions.getSearchFeaturedCategoriesLoadMoreFailed(),
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(
      searchFeaturedCategoriesActions.setSearchFeaturedCategoriesLoadingLoadMore(
        false,
      ),
    );
  }
};

const watcher = function* () {
  // yield takeLatest(productType.GET_PRODUCTS, getCustomerList);
  //List SEARCH_FEATURED_CATEGORIES
  yield takeLatest(
    searchFeaturedCategoriesTypes.GET_SEARCH_FEATURED_CATEGORIES,
    getSearchFeaturedCategories,
  );
  yield takeLatest(
    searchFeaturedCategoriesTypes.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE,
    getLoadMoreSearchFeaturedCategories,
  );
};
export default watcher();
