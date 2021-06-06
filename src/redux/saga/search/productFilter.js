import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getListFeaturedCategoriesService,
  getProductAttributesFilterResultsApi,
} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getProductFilter = function* ({payload}) {
  try {
    yield put(searchActions.setProductsFilterLoading(true));
    const res = yield call(getProductAttributesFilterResultsApi, payload);
    console.log('LONG MAIN FILTER PRODUCTS', res.data.data.content);
    let listProduct = res?.data?.data?.content;

    let initFilterState = {};
    console.log('INIT FILTER STATE', initFilterState);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getProductsFilterSuccess(listProduct));
      yield put(
        searchActions.setProductFilterState({
          attributes: initFilterState,
          category: 0,
          price: [0, 0],
        }),
      );
    } else {
      yield put(searchActions.getProductsFilterFailed());
      yield put(
        searchActions.setProductFilterState({
          attributes: {},
          category: 0,
          price: [0, 0],
        }),
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setProductsFilterLoading(false));
  }
};

const watcher = function* () {
  //List PRODUCT_SEARCH
  yield takeLatest(searchTypes.GET_PRODUCTS_FILTER, getProductFilter);
};
export default watcher();
