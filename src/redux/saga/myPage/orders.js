import {call, put, takeLatest} from 'redux-saga/effects';

import {myPageActions, myPageTypes} from 'reducers';

import {SUCCESS} from 'constants';

import {getListUserOrderByStatus} from 'services/api/myPageApi';

const CREATE_ORDER = 0,
  RECEIVE_ORDER = 10,
  GOOD_ISSUE = 20,
  DELIVERY = 30,
  CANCEL_ORDER = 90,
  COMPLETED = 100;

//Cancel Orders
export const getListCanceledOrders = function* ({payload}) {
  try {
    yield put(myPageActions.setListCanceledOrdersLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListCanceledOrdersSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListCanceledOrdersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListCanceledOrdersLoading(false));
  }
};

export const getListCanceledOrdersLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListCanceledOrdersLoadmoreLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListCanceledOrdersLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListCanceledOrdersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListCanceledOrdersLoadmoreLoading(false));
  }
};
//completed orders
export const getListCompletedOrders = function* ({payload}) {
  try {
    yield put(myPageActions.setListCompletedOrdersLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListCompletedOrdersSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListCompletedOrdersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListCompletedOrdersLoading(false));
  }
};

export const getListCompletedOrdersLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListCompletedOrdersLoadmoreLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListCompletedOrdersLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListCompletedOrdersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListCompletedOrdersLoadmoreLoading(false));
  }
};
//createdOrder
export const getListCreatedOrders = function* ({payload}) {
  try {
    yield put(myPageActions.setListCreatedOrdersLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListCreatedOrdersSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListCreatedOrdersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListCreatedOrdersLoading(false));
  }
};

export const getListCreatedOrdersLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListCreatedOrdersLoadmoreLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListCreatedOrdersLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListCreatedOrdersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListCreatedOrdersLoadmoreLoading(false));
  }
};
//goodIssues Orders
export const getListGoodIssuesOrders = function* ({payload}) {
  try {
    yield put(myPageActions.setListGoodIssuesOrdersLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListGoodIssuesOrdersSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListGoodIssuesOrdersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListGoodIssuesOrdersLoading(false));
  }
};

export const getListGoodIssuesOrdersLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListGoodIssuesOrdersLoadmoreLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListGoodIssuesOrdersLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListGoodIssuesOrdersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListGoodIssuesOrdersLoadmoreLoading(false));
  }
};

//On delivery orders
export const getListOnDeliveryOrders = function* ({payload}) {
  try {
    yield put(myPageActions.setListOnDeliveryOrdersLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListOnDeliveryOrdersSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListOnDeliveryOrdersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListOnDeliveryOrdersLoading(false));
  }
};

export const getListOnDeliveryOrdersLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListOnDeliveryOrdersLoadmoreLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListOnDeliveryOrdersLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListOnDeliveryOrdersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListOnDeliveryOrdersLoadmoreLoading(false));
  }
};
//received orders
export const getListReceiveOrders = function* ({payload}) {
  try {
    yield put(myPageActions.setListReceiveOrdersLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListReceiveOrdersSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListReceiveOrdersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListReceiveOrdersLoading(false));
  }
};

export const getListReceiveOrdersLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListReceiveOrdersLoadmoreLoading(true));
    const res = yield call(getListUserOrderByStatus, {
      ...payload,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListReceiveOrdersLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListReceiveOrdersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(myPageActions.setListReceiveOrdersLoadmoreLoading(false));
  }
};
