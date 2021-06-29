import {call, put, takeLatest} from 'redux-saga/effects';
import {getPrefectureApi} from 'services/api/addressApi';
import {addressActions, addressTypes} from 'reducers';
import {SUCCESS} from 'constants';

const getPrefectureData = function* ({payload}) {
  yield put(addressActions.getPrefectureLoading(true));
  try {
    const res = yield call(getPrefectureApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(addressActions.getPrefectureSuccess(res.data.data.content));
    } else {
      yield put(addressActions.getPrefectureFail());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(addressActions.getPrefectureLoading(false));
  }
};

const getDistrictData = function* ({payload}) {
  yield put(addressActions.getDistrictLoading(true));
  try {
    const res = yield call(getPrefectureApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(addressActions.getDistrictSuccess(res.data.data.content));
    } else {
      yield put(addressActions.getDistrictFail());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(addressActions.getDistrictLoading(false));
  }
};

const getWardData = function* ({payload}) {
  yield put(addressActions.getWardLoading(true));
  try {
    const res = yield call(getPrefectureApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(addressActions.getWardSuccess(res.data.data.content));
    } else {
      yield put(addressActions.getWardFail());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(addressActions.getWardLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(addressTypes.GET_PREFECTURE, getPrefectureData);
  yield takeLatest(addressTypes.GET_DISTRICT, getDistrictData);
  yield takeLatest(addressTypes.GET_WARD, getWardData);
};
export default watcher();
