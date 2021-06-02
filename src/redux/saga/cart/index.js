import {put, takeLatest} from 'redux-saga/effects';

import {categoriesActions, categoriesTypes} from 'reducers';

//List Cart
const setListCart = function* ({payload}) {
  try {
    yield put(categoriesActions.setCartLoading(true));
    yield put(categoriesActions.setListCart(payload));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(categoriesActions.setLeftLoading(false));
  }
};

const watcher = function* () {
  //Left
  yield takeLatest(categoriesTypes.SET_LIST_CART, setListCart);
};
export default watcher();
