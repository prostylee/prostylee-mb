import {call, put, takeLatest} from 'redux-saga/effects';
import {getBranchApi} from 'services/api/branchApi';
import {branchActions, branchTypes} from 'reducers';
import {SUCCESS} from 'constants';

//Left
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
    console.error(e);
  } finally {
    yield put(branchActions.setBranchLoading(false));
  }
};

const watcher = function* () {
  //Left
  yield takeLatest(branchTypes.GET_BRANCH, getBranchData);
};
export default watcher();
