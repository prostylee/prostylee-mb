import {call, select, put, takeLatest, delay} from 'redux-saga/effects';

import {productApi} from 'services';
import {
  brandActions,
  brandTypes,
  brandSelectors,
  userActions,
  commonActions,
} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import * as CONTANTS from 'constants';

import {SUCCESS} from 'constants';
import {getListProductApi} from 'services/api/brandProductApi';
import i18n from 'i18n';

//List product from categories
const getListProduct = function* ({payload}) {
  try {
    console.log('GET BRAND PRODUCTS');
    yield put(brandActions.setListProductLoading(true));
    yield put(brandActions.setPageProductDefault());
    const res = yield call(getListProductApi, payload);
    console.log('BRAND PRODUCT RES', res.data);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(brandActions.getListProductSuccess(res.data.data));
    } else {
      yield put(brandActions.getListProductFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(brandActions.setListProductLoading(false));
  }
};

const getLoadMoreListProduct = function* ({payload}) {
  try {
    yield put(brandActions.setLoadingLoadMoreProduct(true));
    const res = yield call(getListProductApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(brandActions.getListProductLoadMoreSuccess(res.data.data));
    } else {
      yield put(brandActions.getListProductLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(brandActions.setLoadingLoadMoreProduct(false));
  }
};

const watcher = function* () {
  // yield takeLatest(productType.GET_PRODUCTS, getCustomerList);
  //List product from categories
  yield takeLatest(brandTypes.GET_LIST_BRAND_PRODUCT, getListProduct);
  yield takeLatest(
    brandTypes.GET_LIST_BRAND_PRODUCT_LOAD_MORE,
    getLoadMoreListProduct,
  );
};
export default watcher();
