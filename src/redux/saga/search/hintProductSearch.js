import {call, put, takeLatest} from 'redux-saga/effects';

import {getSuggestionsSearchService} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

import {showMessage} from 'react-native-flash-message';

import i18n from 'i18n';

//List HINT_PRODUCT_SEARCH
const getHintProductSearch = function* ({payload}) {
  try {
    yield put(searchActions.setHintProductSearchLoading(true));
    yield put(searchActions.setCurrentKeyword(payload?.keyword));
    yield put(searchActions.setPageHintProductSearchDefault());
    const res = yield call(getSuggestionsSearchService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getHintProductSearchSuccess(res.data.data));
    } else {
      yield put(searchActions.getHintProductSearchFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(searchActions.setHintProductSearchLoading(false));
  }
};

const getLoadMoreHintProductSearch = function* ({payload}) {
  try {
    yield put(searchActions.setHintProductSearchLoadingLoadMore(true));
    const res = yield call(getSuggestionsSearchService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        searchActions.getHintProductSearchLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(searchActions.getHintProductSearchLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(searchActions.setHintProductSearchLoadingLoadMore(false));
  }
};

const watcher = function* () {
  //List HINT_PRODUCT_SEARCH
  yield takeLatest(searchTypes.GET_HINT_PRODUCT_SEARCH, getHintProductSearch);
  yield takeLatest(
    searchTypes.GET_HINT_PRODUCT_SEARCH_LOAD_MORE,
    getLoadMoreHintProductSearch,
  );
};
export default watcher();
