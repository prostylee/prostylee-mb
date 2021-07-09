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
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
const getTopBanner = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBannerAds, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getTopBannerSuccess(res.data.data));
    } else {
      yield put(storeActions.getTopBannerFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setStoreLoading(false));
  }
};

const getMidBanner = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getBannerCampaigns, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getMidBannerSuccess(res.data.data));
    } else {
      yield put(storeActions.getMidBannerFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setStoreLoading(false));
  }
};

const getBrandList = function* ({payload}) {
  try {
    yield put(storeActions.setDefaultPageBrand(0));
    yield put(storeActions.setBrandListLoading(true));
    const res = yield call(getBrandListApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getBrandListSuccess(res.data.data));
    } else {
      yield put(storeActions.getBrandListFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setBrandListLoading(false));
  }
};

const getBrandListLoadmore = function* ({payload}) {
  try {
    yield put(storeActions.setBrandListLoadmoreLoading(true));
    const res = yield call(getBrandListApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getBrandListLoadmoreSuccess(res.data.data));
    } else {
      yield put(storeActions.getBrandListLoadmoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(storeActions.setBrandListLoadmoreLoading(false));
  }
};

const getCategoryList = function* ({payload}) {
  try {
    yield put(storeActions.setStoreLoading(true));
    const res = yield call(getCategories, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getCategoryListSuccess(res.data.data));
    } else {
      yield put(storeActions.getCategoryListFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
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
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
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
  yield takeLatest(storeTypes.GET_BRAND_LIST_LOADMORE, getBrandListLoadmore);
};
export default watcher();
