import {call, put, takeLatest} from 'redux-saga/effects';
import {getDynamicUsers} from 'services/api/dynamicUsersApi';
import {dynamicUsersActions, dynamicUsersTypes} from 'reducers';
import {SUCCESS} from 'constants';

const getListDynamicUsers = function* ({payload}) {
  try {
    yield put(dynamicUsersActions.setLoading(true));
    const res = yield call(getDynamicUsers, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(dynamicUsersActions.getDynamicUserSuccess(res.data.data));
    } else {
      yield put(dynamicUsersActions.getDynamicUserFail());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(dynamicUsersActions.setLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(dynamicUsersTypes.GET_DYNAMIC_USERS, getListDynamicUsers);
};
export default watcher();
