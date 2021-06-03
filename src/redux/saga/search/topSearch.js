import {call, put, takeLatest} from 'redux-saga/effects';

import {searchActions, searchTypes} from 'reducers';
import {SUCCESS} from 'constants';
import {getListTopSearchService} from 'services/api/searchApi';

//List TOP_SEARCH
const getTopSearch = function* ({payload}) {
  try {
    yield put(searchActions.setTopSearchLoading(true));
    const resProduct = yield call(getListTopSearchService, {
      type: 'PRODUCT',
      limit: '10',
      page: 0,
    });
    const resStore = yield call(getListTopSearchService, {
      type: 'STORE',
      limit: '10',
      page: 0,
    });
    const resCategory = yield call(getListTopSearchService, {
      type: 'CATEGORY',
      limit: '10',
      page: 0,
    });
    if (
      resProduct.ok &&
      resProduct.data.status === SUCCESS &&
      !resProduct.data.error &&
      resStore.ok &&
      resStore.data.status === SUCCESS &&
      !resStore.data.error &&
      resCategory.ok &&
      resCategory.data.status === SUCCESS &&
      !resCategory.data.error
    ) {
      yield put(
        searchActions.getTopSearchSuccess({
          resProduct: resProduct.data.data,
          resStore: resStore.data.data,
          resCategory: resCategory.data.data,
        }),
      );
    } else {
      yield put(searchActions.getTopSearchFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setTopSearchLoading(false));
  }
};

const watcher = function* () {
  //List TOP_SEARCH
  yield takeLatest(searchTypes.GET_TOP_SEARCH, getTopSearch);
};
export default watcher();
