import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getStoreResultsApi,
  getStoreBestSellerProduct,
} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';
import i18n from 'i18n';
import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';

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
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
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
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
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
