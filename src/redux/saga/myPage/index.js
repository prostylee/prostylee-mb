import {call, put, takeLatest} from 'redux-saga/effects';

import {myPageActions, myPageTypes} from 'reducers';

import {SUCCESS} from 'constants';
import {
  getListCanceledOrders,
  getListCanceledOrdersLoadmore,
  getListCompletedOrders,
  getListCompletedOrdersLoadmore,
  getListCreatedOrders,
  getListCreatedOrdersLoadmore,
  getListGoodIssuesOrders,
  getListGoodIssuesOrdersLoadmore,
  getListOnDeliveryOrders,
  getListOnDeliveryOrdersLoadmore,
  getListReceiveOrders,
  getListReceiveOrdersLoadmore,
} from './orders';

import {
  getListProductSaleService,
  getListProductSoldService,
  getListUserPostService,
  getListUserOrderStatus as getListUserOrderStatusApi,
  getListProductLikedService,
  getListProductSavedService,
} from 'services/api/myPageApi';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';

//List product from sale
const getListProductSale = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductSaleLoading(true));
    yield put(myPageActions.setPageProductSaleDefault());
    const res = yield call(getListProductSaleService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSaleSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSaleFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListProductSaleLoading(false));
  }
};

const getLoadMoreListProductSale = function* ({payload}) {
  try {
    yield put(myPageActions.setLoadingLoadMoreProductSale(true));
    const res = yield call(getListProductSaleService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSaleLoadMoreSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSaleLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setLoadingLoadMoreProductSale(false));
  }
};

//List product from sold
const getListProductSold = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductSoldLoading(true));
    yield put(myPageActions.setPageProductSoldDefault());
    const res = yield call(getListProductSoldService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSoldSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSoldFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListProductSoldLoading(false));
  }
};

const getLoadMoreListProductSold = function* ({payload}) {
  try {
    yield put(myPageActions.setLoadingLoadMoreProductSold(true));
    const res = yield call(getListProductSoldService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSoldLoadMoreSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSoldLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setLoadingLoadMoreProductSold(false));
  }
};
//LIST PRODUCT LIKED

const getListProductLiked = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductLikedLoading(true));
    const res = yield call(getListProductLikedService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductLikedSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductLikedFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListProductLikedLoading(false));
  }
};

const getLoadMoreListProductLiked = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductLikedLoadmoreLoading(true));
    const res = yield call(getListProductLikedService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListProductLikedLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListProductLikedLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListProductLikedLoadmoreLoading(false));
  }
};
//LIST PRODUCT SAVED

const getListProductSaved = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductSavedLoading(true));
    const res = yield call(getListProductSavedService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListProductSavedSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListProductSavedFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListProductSavedLoading(false));
  }
};

const getLoadMoreListProductSaved = function* ({payload}) {
  try {
    yield put(myPageActions.setListProductSavedLoadmoreLoading(true));
    const res = yield call(getListProductSavedService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        myPageActions.getListProductSavedLoadmoreSuccess(res.data.data),
      );
    } else {
      yield put(myPageActions.getListProductSavedLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListProductSavedLoadmoreLoading(false));
  }
};

//List USER POSTS
const getListUserPost = function* ({payload}) {
  try {
    yield put(myPageActions.setListUserPostLoading(true));
    const res = yield call(getListUserPostService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListUserPostSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListUserPostFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListUserPostLoading(false));
  }
};

const getListUserPostLoadmore = function* ({payload}) {
  try {
    yield put(myPageActions.setListUserPostLoadmoreLoading(true));
    const res = yield call(getListUserPostService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getListUserPostLoadmoreSuccess(res.data.data));
    } else {
      yield put(myPageActions.getListUserPostLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setListUserPostLoadmoreLoading(false));
  }
};

const getListUserOrderStatus = function* ({payload}) {
  try {
    yield put(myPageActions.setUserOrdersStatusLoading(true));
    const res = yield call(getListUserOrderStatusApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(myPageActions.getUserOrdersStatusListSuccess(res.data.data));
    } else {
      yield put(myPageActions.getUserOrdersStatusListFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(myPageActions.setUserOrdersStatusLoading(false));
  }
};

const watcher = function* () {
  //List product from sale
  yield takeLatest(myPageTypes.GET_LIST_PRODUCT_SALE, getListProductSale);
  yield takeLatest(
    myPageTypes.GET_LIST_PRODUCT_SALE_LOAD_MORE,
    getLoadMoreListProductSale,
  );
  //List product from sold
  yield takeLatest(myPageTypes.GET_LIST_PRODUCT_SALE, getListProductSold);
  yield takeLatest(
    myPageTypes.GET_LIST_PRODUCT_SALE_LOAD_MORE,
    getLoadMoreListProductSold,
  );
  //List User post
  yield takeLatest(myPageTypes.GET_LIST_USER_POST, getListUserPost);
  yield takeLatest(
    myPageTypes.GET_LIST_USER_POST_LOADMORE,
    getListUserPostLoadmore,
  );
  yield takeLatest(
    myPageTypes.GET_USER_ORDERS_STATUS_LIST,
    getListUserOrderStatus,
  );
  //PRODUCT LIKE
  yield takeLatest(myPageTypes.GET_LIST_PRODUCT_LIKED, getListProductLiked);
  yield takeLatest(
    myPageTypes.GET_LIST_PRODUCT_LIKED_LOADMORE,
    getLoadMoreListProductLiked,
  );
  //PRODUCT SAVED
  yield takeLatest(myPageTypes.GET_LIST_PRODUCT_SAVED, getListProductSaved);
  yield takeLatest(
    myPageTypes.GET_LIST_PRODUCT_SAVED_LOADMORE,
    getLoadMoreListProductSaved,
  );
  //ORDER CANCELED
  yield takeLatest(myPageTypes.GET_LIST_CANCELED_ORDERS, getListCanceledOrders);
  yield takeLatest(
    myPageTypes.GET_LIST_CANCELED_ORDERS_LOADMORE,
    getListCanceledOrdersLoadmore,
  );
  //ORDERS COMPLETED
  yield takeLatest(
    myPageTypes.GET_LIST_COMPLETED_ORDERS,
    getListCompletedOrders,
  );
  yield takeLatest(
    myPageTypes.GET_LIST_COMPLETED_ORDERS_LOADMORE,
    getListCompletedOrdersLoadmore,
  );
  //ORDER CREATED
  yield takeLatest(myPageTypes.GET_LIST_CREATED_ORDERS, getListCreatedOrders);
  yield takeLatest(
    myPageTypes.GET_LIST_CREATED_ORDERS_LOADMORE,
    getListCreatedOrdersLoadmore,
  );
  //ORDER GOODISSUES
  yield takeLatest(
    myPageTypes.GET_LIST_GOOD_ISSUES_ORDERS,
    getListGoodIssuesOrders,
  );
  yield takeLatest(
    myPageTypes.GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE,
    getListGoodIssuesOrdersLoadmore,
  );
  //ORDER ONDELIVERY
  yield takeLatest(
    myPageTypes.GET_LIST_ON_DELIVERY_ORDERS,
    getListOnDeliveryOrders,
  );
  yield takeLatest(
    myPageTypes.GET_LIST_ON_DELIVERY_ORDERS_LOADMORE,
    getListOnDeliveryOrdersLoadmore,
  );
  //ORDER RECEIVED
  yield takeLatest(myPageTypes.GET_LIST_RECEIVE_ORDERS, getListReceiveOrders);
  yield takeLatest(
    myPageTypes.GET_LIST_RECEIVE_ORDERS_LOADMORE,
    getListReceiveOrdersLoadmore,
  );
};
export default watcher();
