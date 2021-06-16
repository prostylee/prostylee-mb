import {call, put, takeLatest} from 'redux-saga/effects';
import {getPrefectureApi} from 'services/api/addressApi';
import {addressActions, addressTypes} from 'reducers';
import {SUCCESS} from 'constants';

//Left
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

const watcher = function* () {
  //Left
  yield takeLatest(addressTypes.GET_PREFECTURE, getPrefectureData);
};
export default watcher();
