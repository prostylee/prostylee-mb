import {call, put, takeLatest} from 'redux-saga/effects';

import {api} from 'services';
import {getTopStore} from 'services/api/storeApi'
import {storeActions, storeTypes, commonActions} from 'reducers';

const getTopProduct = function* ({payload}) {
  try {
    yield put(storeActions.setLoading(true));
    const res = yield call(getTopStore, payload);
    if (res.ok) {
      yield put(storeActions.getTopProductSuccess(res.data));
    } else {
      yield put(storeActions.getTopProductFailed());
    }
  } catch (e) {
    console.error(e);
  }finally{
    yield put(storeActions.setLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(storeTypes.GET_TOP_PRODUCT, getTopProduct);
};
export default watcher();
