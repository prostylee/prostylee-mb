import {call, put, takeLatest} from 'redux-saga/effects';
import {postStatusByUser} from 'services/api/statusApi';
import {statusActions, statusTypes} from 'reducers';

import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
const postStatus = function* (payload) {
  try {
    const res = yield call(postStatusByUser, payload.payload);
    if (res.ok && res.data.status === SUCCESS) {
      yield put(statusActions.postStatusSuccess(res.data.data));
    } else {
      yield put(statusActions.postStatusFail());
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
  yield takeLatest(statusTypes.POST_STATUS, postStatus);
};
export default watcher();
