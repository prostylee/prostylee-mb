import {call, put, takeLatest} from 'redux-saga/effects';
import {postStoriesByUser} from 'services/api/newFeedApi';
import {getProductById} from 'services/api/productApi';
import {getStoreById, getStoreMiniApi} from 'services/api/storeApi';
import {newFeedActions, newFeedTypes} from 'reducers';

import {SUCCESS} from 'constants';

const postStatus = function* (payload) {
  try {
    const res = yield call(postStoriesByUser, payload.payload);
    if (res.ok && res.data.status === SUCCESS) {
      yield put(newFeedActions.postStorySuccess(res.data.data));
    } else {
      yield put(newFeedActions.postStoryFail());
    }
  } catch (e) {
    console.error(e);
  }
};

const watcher = function* () {
  yield takeLatest(newFeedTypes.POST_STORY, postStatus);
};
export default watcher();
