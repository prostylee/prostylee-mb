import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getBranchApi,
  getBranchCityApi,
  orderAtStoreApi,
} from 'services/api/branchApi';
import {branchActions, branchTypes, commonActions} from 'reducers';
import {SUCCESS} from 'constants';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';

const getBranchData = function* ({payload}) {
  yield put(branchActions.setBranchLoading(true));
  try {
    const res = yield call(getBranchApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(branchActions.getBranchSuccess(res.data.data.content));
    } else {
      yield put(branchActions.getBranchFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(branchActions.setBranchLoading(false));
  }
};

const getBranchCityData = function* ({payload}) {
  yield put(branchActions.setBranchCityLoading(true));
  try {
    const res = yield call(getBranchCityApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(branchActions.getBranchCitySuccess(res.data.data));
    } else {
      yield put(branchActions.getBranchCityFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(branchActions.setBranchCityLoading(false));
  }
};

const getOrderAtBranch = function* ({payload}) {
  yield put(branchActions.setOrderAtBranchLoading(true));
  yield put(commonActions.toggleLoading(true));
  try {
    const res = yield call(orderAtStoreApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(branchActions.getOrderAtBranchSuccess(res.data.data));
    } else {
      yield put(branchActions.getOrderAtBranchFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(branchActions.setOrderAtBranchLoading(false));
    yield put(commonActions.toggleLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(branchTypes.GET_BRANCH, getBranchData);
  yield takeLatest(branchTypes.GET_BRANCH_CITY, getBranchCityData);
  yield takeLatest(branchTypes.GET_ORDER_AT_BRANCH, getOrderAtBranch);
};
export default watcher();
