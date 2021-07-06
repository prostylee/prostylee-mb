import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getListFeaturedCategoriesService,
  getProductAttributesFilterResultsApi,
} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

import i18n from 'i18n';

import {showMessage} from 'react-native-flash-message';

//List FEATURED_PRODUCT_SEARCH

const getProductFilter = function* ({payload}) {
  try {
    yield put(searchActions.setProductsFilterLoading(true));
    const res = yield call(getProductAttributesFilterResultsApi, payload);
    let listProduct = res?.data?.data?.content;
    let initFilterState = {};
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
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(searchActions.setProductsFilterLoading(false));
  }
};

const watcher = function* () {
  //List PRODUCT_SEARCH
  yield takeLatest(searchTypes.GET_PRODUCTS_FILTER, getProductFilter);
};
export default watcher();
