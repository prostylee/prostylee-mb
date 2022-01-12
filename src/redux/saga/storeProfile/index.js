import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getStoreProfile as getStoreProfileApi,
  getStoreStatistics as getStoreStatisticsApi,
  getStoreBestSellerProduct as getStoreBestSellerProductApi,
  getAllStoreProduct as getAllStoreProductApi,
  getVouchers as getStoreVouchersApi,
  postSaveVouchers as postSaveStoreVouchersApi,
  getStorePosts as getStorePostsApi,
} from 'services/api/storeProfileApi';
import {storeProfileActions, storeProfileTypes} from 'reducers';
import {SUCCESS, POST_SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';

const getStoreProfile = function* ({payload}) {
  try {
    yield put(storeProfileActions.setStoreProfileLoading(true));
    const res = yield call(getStoreProfileApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeProfileActions.getStoreInfoSuccess(res?.data?.data));
    } else {
      yield put(storeProfileActions.getStoreInfoFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeProfileActions.setStoreProfileLoading(false));
  }
};

const getStoreStatistics = function* ({payload}) {
  try {
    const res = yield call(getStoreStatisticsApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeProfileActions.getStoreStatisticsSuccess(res?.data?.data));
    } else {
      yield put(storeProfileActions.getStoreStatisticsFailed());
    }
  } catch (e) {
    yield put(storeProfileActions.getStoreStatisticsFailed());
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};
const getStorePost = function* ({payload}) {
  try {
    const res = yield call(getStorePostsApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeProfileActions.getStorePostSuccess(res?.data?.data));
    } else {
      yield put(storeProfileActions.getStorePostFail());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const getAllStoreProduct = function* ({payload}) {
  try {
    yield put(storeProfileActions.setAllStoreProductLoading(true));
    const res = yield call(getAllStoreProductApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeProfileActions.getAllStoreProductSuccess(res?.data?.data));
    } else {
      yield put(storeProfileActions.getAllStoreProductFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeProfileActions.setAllStoreProductLoading(false));
  }
};
const getAllStoreProductLoadmore = function* ({payload}) {
  try {
    yield put(storeProfileActions.setAllStoreProductLoadmoreLoading(true));
    const res = yield call(getAllStoreProductApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        storeProfileActions.getAllStoreProductLoadmoreSuccess(res?.data?.data),
      );
    } else {
      yield put(storeProfileActions.getAllStoreProductLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeProfileActions.setAllStoreProductLoadmoreLoading(false));
  }
};
const getStoreBestSellerProduct = function* ({payload}) {
  try {
    yield put(storeProfileActions.setStoreBestSellerProductLoading(true));
    const res = yield call(getStoreBestSellerProductApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        storeProfileActions.getStoreBestSellerProductSuccess(res?.data?.data),
      );
    } else {
      yield put(storeProfileActions.getStoreBestSellerProductFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeProfileActions.setStoreBestSellerProductLoading(false));
  }
};

const getVouchers = function* ({payload}) {
  try {
    yield put(storeProfileActions.setStoreVouchersLoading(true));
    const res = yield call(getStoreVouchersApi, payload);
    let listStore = res?.data?.data;
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeProfileActions.getStoreVouchersSuccess(listStore));
    } else {
      yield put(storeProfileActions.getStoreVouchersFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeProfileActions.setStoreVouchersLoading(false));
  }
};
const getVouchersLoadmore = function* ({payload}) {
  try {
    yield put(storeProfileActions.setStoreVouchersLoadmoreLoading(true));
    const res = yield call(getStoreVouchersApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        storeProfileActions.getStoreVouchersLoadmoreSuccess(res?.data?.data),
      );
    } else {
      yield put(storeProfileActions.getStoreVouchersLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeProfileActions.setStoreVouchersLoadmoreLoading(false));
  }
};

const postSaveVoucher = function* ({payload}) {
  try {
    const res = yield call(postSaveStoreVouchersApi, payload);
    if (res.ok && res.data.status === POST_SUCCESS && !res.data.error) {
      yield put(storeProfileActions.postSaveStoreVoucherSuccess(payload));
    } else {
      yield put(storeProfileActions.postSaveStoreVoucherFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const watcher = function* () {
  yield takeLatest(storeProfileTypes.GET_STORE_INFO, getStoreProfile);
  yield takeLatest(storeProfileTypes.GET_STORE_STATISTICS, getStoreStatistics);
  yield takeLatest(storeProfileTypes.GET_STORE_POST, getAllStoreProduct);
  yield takeLatest(storeProfileTypes.GET_ALL_STORE_PRODUCT, getStorePost);
  yield takeLatest(
    storeProfileTypes.GET_ALL_STORE_PRODUCT_LOADMORE,
    getAllStoreProductLoadmore,
  );

  yield takeLatest(
    storeProfileTypes.GET_STORE_BESTSELLER_PRODUCT,
    getStoreBestSellerProduct,
  );
  //STORE VOUCHER
  yield takeLatest(storeProfileTypes.GET_STORE_VOUCHERS, getVouchers);

  yield takeLatest(
    storeProfileTypes.GET_STORE_VOUCHERS_LOADMORE,
    getVouchersLoadmore,
  );
  yield takeLatest(storeProfileTypes.POST_SAVE_STORE_VOUCHER, postSaveVoucher);
};
export default watcher();
