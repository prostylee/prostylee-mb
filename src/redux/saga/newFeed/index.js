import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getNewFeed,
  getStoriesByStore,
  getStoriesByUser,
} from 'services/api/newFeedApi';
import {getProductById} from 'services/api/productApi';
import {newFeedActions, newFeedTypes} from 'reducers';

import {SUCCESS} from 'constants';

const getNewFeeds = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoading(true));
    const res = yield call(getNewFeed, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(newFeedActions.getNewFeedSuccess(res.data.data));
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
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(newFeedActions.handleLoadMoreSuccess(res.data.data));
    } else {
      yield put(newFeedActions.handleLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(newFeedActions.handleLoadMoreLoading(false));
  }
};

const getStoriesByStores = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoadingStories(false));
    const res = yield call(getStoriesByStore, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      let storyData = res.data.data;
      let contentWithPoduct = [];
      for (const story of storyData.content) {
        const productId = story.productId;
        if (productId) {
          const productRes = yield call(getProductById, productId);
          if (productRes.ok && productRes.data.status === SUCCESS) {
            contentWithPoduct.push({
              ...story,
              product: productRes.data.data,
            });
          }
        }
      }
      storyData.content = contentWithPoduct;
      yield put(newFeedActions.getStoriesByStoreSuccess(storyData));
    } else {
      yield put(newFeedActions.getStoriesByStoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(newFeedActions.setLoadingStories(false));
  }
};

const getStoriesByUsers = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoadingStories(false));
    const res = yield call(getStoriesByUser, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(newFeedActions.getStoriesByUserSuccess(res.data.data));
    } else {
      yield put(newFeedActions.getStoriesByUserFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(newFeedActions.setLoadingStories(false));
  }
};

const getProductOfStory = function* (id) {
  try {
    const res = yield call(getProductById, id);
    if (res.ok && res.data.status === SUCCESS) {
      yield put(newFeedActions.getProductOfStorySuccess(res.data.data));
    } else {
      yield put(newFeedActions.getProductOfStoryFailed());
    }
  } catch (e) {
    console.error(e);
  }
};

const watcher = function* () {
  yield takeLatest(newFeedTypes.GET_NEW_FEED, getNewFeeds);
  yield takeLatest(newFeedTypes.HANDLE_LOAD_MORE, getLoadMoreNewFeed);
  yield takeLatest(newFeedTypes.GET_STORIES_BY_STORE, getStoriesByStores);
  yield takeLatest(newFeedTypes.GET_STORIES_BY_USER, getStoriesByUsers);
  yield takeLatest(newFeedTypes.GET_PRODUCT_OF_STORIES, getProductOfStory);
};
export default watcher();
