import {call, put, takeLatest} from 'redux-saga/effects';

import {cartActions, cartTypes} from 'reducers';

import {
  getPaymentMethods,
  getRecentViewList,
  getSuggestionsList,
} from 'services/api/cartApi';

import {SUCCESS} from 'constants';

//List Cart
const setListCart = function* ({payload}) {
  try {
    yield put(cartActions.setCartLoading(true));
    yield put(cartActions.setListCartSuccess(payload));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(cartActions.setCartLoading(false));
  }
};

const getListPayment = function* ({payload}) {
  try {
    yield put(cartActions.setCartLoading(true));
    const res = yield call(getPaymentMethods, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListPaymentSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListPaymentFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(cartActions.setCartLoading(false));
  }
};

const getListRecent = function* ({payload}) {
  try {
    yield put(cartActions.setRecentLoading(true));
    const res = yield call(getRecentViewList, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListRecentSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListRecentFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(cartActions.setRecentLoading(false));
  }
};

const getListSuggestion = function* ({payload}) {
  try {
    yield put(cartActions.setSuggestionLoading(true));
    const res = yield call(getSuggestionsList, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListSuggestionSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListSuggestionFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(cartActions.setSuggestionLoading(false));
  }
};

const watcher = function* () {
  //List Cart
  yield takeLatest(cartTypes.SET_LIST_CART, setListCart);
  yield takeLatest(cartTypes.GET_LIST_PAYMENT, getListPayment);
  yield takeLatest(cartTypes.GET_LIST_RECENT, getListRecent);
  yield takeLatest(cartTypes.GET_LIST_SUGGESTION, getListSuggestion);
};
export default watcher();
