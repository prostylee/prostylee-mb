import {call, put, takeLatest} from 'redux-saga/effects';
import {GET, POST, PUT} from 'constants';
import {_fetch} from '../../../services/config';
import {
  getBannerAds,
  getBrandList as getBrandListApi,
  getCategories,
  getBannerCampaigns,
  getBottomTabList as getBottomTabListApi,
} from 'services/api/storeApi';
import {storeActions, storeTypes} from 'reducers';
import {SUCCESS} from 'constants';

const getTopBanner = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBannerAds, payload);
    console.log('BANNER ADS', res.data.data);
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
    const res = yield call(getBannerCampaigns, payload);
    console.log('BANNER CAMPAIGNS', res.data.data);
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

const getBottomTabList = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBottomTabListApi, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getBottomTabListSuccess(res.data.data));
    } else {
      yield put(storeActions.getBottomTabListFailed());
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
  yield takeLatest(storeTypes.GET_BOTTOM_TAB_LIST, getBottomTabList);
};
export default watcher();
