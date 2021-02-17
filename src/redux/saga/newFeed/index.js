import {call, put, takeLatest} from 'redux-saga/effects';

import {getNewFeed} from 'services/api/newFeedApi';
import {newFeedActions, newFeedTypes} from 'reducers';

const getNewFeeds = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoading(true));
    const res = yield call(getNewFeed, payload);
    if (res.ok) {
      yield put(newFeedActions.getNewFeedSuccess(res.data));
    } else {
      yield put(newFeedActions.getNewFeedFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(newFeedActions.setLoading(false));
  }
};

const getLoadMoreNewFeed = function* ({payload}) {
  try {
    yield put(newFeedActions.handleLoadMoreLoading(true));
    const res = yield call(getNewFeed, payload);
    if (res.ok) {
      yield put(newFeedActions.handleLoadMoreSuccess(res.data));
    } else {
      yield put(newFeedActions.handleLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(newFeedActions.handleLoadMoreLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(newFeedTypes.GET_NEW_FEED, getNewFeeds);
  yield takeLatest(newFeedTypes.HANDLE_LOAD_MORE, getLoadMoreNewFeed);
};
export default watcher();
