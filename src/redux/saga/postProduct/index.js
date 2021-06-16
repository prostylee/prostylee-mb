import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getListAttributesByCategoryId,
  getListProductStatus as getListProductStatusApi,
  getListPaymentMethod as getListPaymentMethodApi,
  getListDeliveryType as getListDeliveryTypeApi,
  getListLocation as getListLocationApi,
  postProduct as postProductApi,
} from 'services/api/postProductApi';
import {postProductActions, postProductTypes} from 'reducers';
import {SUCCESS, POST_SUCCESS} from 'constants';

const getListAttributes = function* ({payload}) {
  try {
    yield put(postProductActions.setListAttributesLoading(true));
    const res = yield call(getListAttributesByCategoryId, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getListAttributesSuccess(res.data.data));
    } else {
      yield put(postProductActions.getListAttributesFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setListAttributesLoading(false));
  }
};

const getListProductStatus = function* ({payload}) {
  try {
    yield put(postProductActions.setListProductStatusLoading(true));
    const res = yield call(getListProductStatusApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getListProductStatusFailed(res.data.data));
    } else {
      yield put(postProductActions.getListProductStatusFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setListProductStatusLoading(false));
  }
};

const getListDeliveryType = function* ({payload}) {
  try {
    yield put(postProductActions.setListDeliveryTypeLoading(true));
    const res = yield call(getListDeliveryTypeApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getListDeliveryTypeSuccess(res.data.data));
    } else {
      yield put(postProductActions.getListDeliveryTypeFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setListDeliveryTypeLoading(false));
  }
};

const getListPaymentMethod = function* ({payload}) {
  try {
    yield put(postProductActions.setListPaymentMethodLoading(true));
    const res = yield call(getListPaymentMethodApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getListPaymentMethodSuccess(res.data.data));
    } else {
      yield put(postProductActions.getListPaymentMethodFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setListPaymentMethodLoading(false));
  }
};

const getListLocation = function* ({payload}) {
  try {
    yield put(postProductActions.setListLocationLoading(true));
    const res = yield call(getListLocationApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getListLocationSuccess(res.data.data));
    } else {
      yield put(postProductActions.getListLocationFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setListLocationLoading(false));
  }
};

const postProduct = function* ({payload}) {
  try {
    yield put(postProductActions.setPostProductLoading(true));
    const res = yield call(postProductApi, payload);
    if (res.ok && res.data.status === POST_SUCCESS && !res.data.error) {
      yield put(postProductActions.getPostProductSuccess());
    } else {
      yield put(postProductActions.getPostProductFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setPostProductLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(postProductTypes.GET_LIST_ATTIBUTES, getListAttributes);
  yield takeLatest(
    postProductTypes.GET_LIST_PRODUCT_STATUS,
    getListProductStatus,
  );
  yield takeLatest(
    postProductTypes.GET_LIST_DELIVERY_TYPE,
    getListDeliveryType,
  );
  yield takeLatest(
    postProductTypes.GET_LIST_PAYMENT_METHOD,
    getListPaymentMethod,
  );
  yield takeLatest(postProductTypes.GET_LIST_LOCATION, getListLocation);
  yield takeLatest(postProductTypes.GET_POST_PRODUCT, postProduct);
};
export default watcher();
