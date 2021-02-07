import {call, put, takeLatest} from 'redux-saga/effects';

import {api} from 'services';
import {getNewFeed} from 'services/api/newFeedApi'
import {newFeedActions, newFeedTypes, commonActions} from 'reducers';

const getNewFeeds = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoading(true));
    const res = yield call(getNewFeed, payload);
    if (res.ok) {
      yield put(newFeedActions.getNewFeedSuccess(res.data));
    } else {
      yield put(commonActions.getNewFeedFailed());
    }
  } catch (e) {
    console.error(e.message);
  }finally{
    yield put(newFeedActions.setLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(newFeedTypes.GET_NEW_FEED, getNewFeeds);
};
export default watcher();
