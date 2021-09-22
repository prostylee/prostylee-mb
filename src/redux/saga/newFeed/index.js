import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  getNewFeed,
  getStoriesByStore,
  getStoriesByUser,
  postStoriesByUser,
  getPosts,
} from 'services/api/newFeedApi';
import {getProductById} from 'services/api/productApi';
import {getStoreById, getStoreMiniApi} from 'services/api/storeApi';
import {newFeedActions, newFeedTypes} from 'reducers';
import RootNavigator from 'navigator/rootNavigator';

import {
  SUCCESS,
  TYPE_STORE,
  TYPE_USER,
  POST_SUCCESS,
  PAGE_DEFAULT,
} from 'constants';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';

const getNewFeeds = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoading(true));
    let res = {};
    if (payload.newFeedType === TYPE_STORE) {
      res = yield call(getNewFeed, payload);
    } else {
      res = yield call(getPosts, payload);
    }
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(newFeedActions.getNewFeedSuccess(res.data.data));
    } else {
      yield put(newFeedActions.getNewFeedFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(newFeedActions.setLoading(false));
  }
};

const getLoadMoreNewFeed = function* ({payload}) {
  try {
    yield put(newFeedActions.handleLoadMoreLoading(true));
    let res = {};
    if (payload.newFeedType === TYPE_STORE) {
      res = yield call(getNewFeed, payload);
    } else {
      res = yield call(getPosts, payload);
    }
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(newFeedActions.handleLoadMoreSuccess(res.data.data));
    } else {
      yield put(newFeedActions.handleLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(newFeedActions.handleLoadMoreLoading(false));
  }
};

const getStoriesByStores = function* ({payload}) {
  try {
    yield put(newFeedActions.setLoadingStories(true));
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
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(newFeedActions.setLoadingStories(false));
  }
};

const getStoriesByUsers = function* () {
  const limit = yield select((state) => state.newFeed.limitStories);
  const request = {
    limit,
    page: PAGE_DEFAULT,
  };
  try {
    yield put(newFeedActions.setLoadingStories(true));
    const res = yield call(getStoriesByUser, request);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      let storyData = res.data.data;
      let contentWithStore = [];
      for (const story of storyData.content) {
        const storeId = story.storeId;
        if (storeId) {
          const productRes = yield call(getStoreById, storeId);
          if (productRes.ok && productRes.data.status === SUCCESS) {
            contentWithStore.push({
              ...story,
              store: productRes.data.data,
            });
          }
        }
      }
      storyData.content = contentWithStore;
      yield put(newFeedActions.getStoriesByUserSuccess(storyData));
    } else {
      yield put(newFeedActions.getStoriesByUserFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(newFeedActions.setLoadingStories(false));
  }
};

const getMoreStoriesByUsers = function* () {
  const page = yield select((state) => state.newFeed.pageStories);
  const limit = yield select((state) => state.newFeed.limitStories);
  const stories = yield select((state) => state.newFeed.stories);
  const request = {
    limit,
    page,
  };
  try {
    const res = yield call(getStoriesByUser, request);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      let storyData = res.data.data;
      let contentWithStore = [...(stories?.content || [])];
      for (const story of storyData.content) {
        const storeId = story.storeId;
        if (storeId) {
          const productRes = yield call(getStoreById, storeId);
          if (productRes.ok && productRes.data.status === SUCCESS) {
            contentWithStore.push({
              ...story,
              store: productRes.data.data,
            });
          }
        }
      }
      storyData.content = contentWithStore;
      yield put(newFeedActions.getStoriesByUserMoreSuccess(storyData));
    } else {
      yield put(newFeedActions.getStoriesByUserMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
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
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const getStoreMini = function* (payload) {
  yield put(newFeedActions.getStoreMiniLoading(true));
  try {
    const res = yield call(getStoreMiniApi, payload);
    if (res.ok && res.data.status === SUCCESS) {
      yield put(newFeedActions.getStoreMiniSuccess(res.data.data));
    } else {
      yield put(newFeedActions.getStoreMiniFail());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(newFeedActions.getStoreMiniLoading(false));
  }
};

const getLoadMoreStoreMini = function* ({payload}) {
  yield put(newFeedActions.getStoreMiniLoadMoreLoading(true));
  try {
    const res = yield call(getStoreMiniApi, payload);
    if (res.ok && res.data.status === SUCCESS) {
      yield put(newFeedActions.getLoadMoreStoreMiniSuccess(res.data.data));
    } else {
      yield put(newFeedActions.getStoreMiniLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(newFeedActions.getStoreMiniLoadMoreLoading(false));
  }
};

const postStory = function* (payload) {
  const getTargetType = (state) => state.common.targetType;
  const targetType = yield select(getTargetType);
  try {
    const res = yield call(postStoriesByUser, payload.payload);
    if (
      res.ok &&
      (res.data.status === SUCCESS || res.data.status === POST_SUCCESS)
    ) {
      if (targetType === TYPE_USER) {
        yield put(newFeedActions.getStoriesByUser());
      }
      showMessage({
        message: i18n.t('addStory.addStorySuccess'),
        type: 'success',
        position: 'top',
      });
      RootNavigator.navigate('Home');
      yield put(newFeedActions.postStorySuccess(res.data.data));
      yield put(newFeedActions.removeNewFeedStore());
    } else {
      showMessage({
        message: i18n.t('addStory.addStoryFail'),
        type: 'danger',
        position: 'top',
      });
      yield put(newFeedActions.postStoryFail());
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
  yield takeLatest(newFeedTypes.GET_NEW_FEED, getNewFeeds);
  yield takeLatest(newFeedTypes.HANDLE_LOAD_MORE, getLoadMoreNewFeed);
  yield takeLatest(newFeedTypes.GET_STORIES_BY_STORE, getStoriesByStores);
  yield takeLatest(newFeedTypes.GET_STORIES_BY_USER, getStoriesByUsers);
  yield takeLatest(
    newFeedTypes.GET_STORIES_BY_USER_MORE,
    getMoreStoriesByUsers,
  );
  yield takeLatest(newFeedTypes.GET_PRODUCT_OF_STORIES, getProductOfStory);
  yield takeLatest(newFeedTypes.GET_STORE_MINI, getStoreMini);
  yield takeLatest(newFeedTypes.GET_STORE_MINI_LOAD_MORE, getLoadMoreStoreMini);
  yield takeLatest(newFeedTypes.POST_STORY, postStory);
};
export default watcher();
