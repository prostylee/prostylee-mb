import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getBannerImageByGroupId,
  getBrandList as getBrandListApi,
  getCategories,
} from 'services/api/storeApi';
import {storeActions, storeTypes} from 'reducers';
import {SUCCESS} from 'constants';

const getTopBanner = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBannerImageByGroupId, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getTopBannerSuccess(res.data.data));
    } else {
      yield put(storeActions.getTopBannerFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setStoreLoading(false));
  }
};

const getMidBanner = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBannerImageByGroupId, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getMidBannerSuccess(res.data.data));
    } else {
      yield put(storeActions.getMidBannerFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setStoreLoading(false));
  }
};

const getBrandList = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBrandListApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getBrandListSuccess(res.data.data));
    } else {
      yield put(storeActions.getBrandListFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setStoreLoading(false));
  }
};

const getCategoryList = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getCategories, payload);

    console.log('GET CATEGORY LIST SUCCESS', res.data.data);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getCategoryListSuccess(res.data.data));
    } else {
      yield put(storeActions.getCategoryListFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setStoreLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(storeTypes.GET_TOP_BANNER, getTopBanner);
  yield takeLatest(storeTypes.GET_MID_BANNER, getMidBanner);
  yield takeLatest(storeTypes.GET_BRAND_LIST, getBrandList);
  yield takeLatest(storeTypes.GET_CATEGORY_LIST, getCategoryList);
};
export default watcher();
