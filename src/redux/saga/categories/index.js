import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getParentCategories,
  getChildCategories,
} from 'services/api/categoriesApi';
import {categoriesActions, categoriesTypes} from 'reducers';
import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
//Left
const getListLeftCategories = function* ({payload}) {
  try {
    yield put(categoriesActions.setLeftLoading(true));
    yield put(categoriesActions.setPageLeftCategoriesDefault());
    const res = yield call(getParentCategories, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(categoriesActions.getListLeftCategoriesSuccess(res.data.data));
    } else {
      yield put(categoriesActions.getListLeftCategoriesFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(categoriesActions.setLeftLoading(false));
  }
};

const getLoadMoreListLeftCategories = function* ({payload}) {
  try {
    yield put(categoriesActions.setLoadingLoadMoreLeftCategories(true));
    const res = yield call(getParentCategories, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        categoriesActions.getListLeftCategoriesLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(categoriesActions.getListLeftCategoriesLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(categoriesActions.setLoadingLoadMoreLeftCategories(false));
  }
};

//Right
const getListRightCategories = function* ({payload}) {
  try {
    yield put(categoriesActions.setRightLoading(true));
    yield put(categoriesActions.setPageRightCategoriesDefault());
    const res = yield call(getChildCategories, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(categoriesActions.getListRightCategoriesSuccess(res.data.data));
    } else {
      yield put(categoriesActions.getListRightCategoriesFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(categoriesActions.setRightLoading(false));
  }
};

const getLoadMoreListRightCategories = function* ({payload}) {
  try {
    yield put(categoriesActions.setLoadingLoadMoreRightCategories(true));
    const res = yield call(getChildCategories, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        categoriesActions.getListRightCategoriesLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(categoriesActions.getListRightCategoriesLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'success',
      position: 'top',
    });
  } finally {
    yield put(categoriesActions.setLoadingLoadMoreRightCategories(false));
  }
};

const watcher = function* () {
  //Left
  yield takeLatest(
    categoriesTypes.GET_LIST_LEFT_CATEGORIES,
    getListLeftCategories,
  );
  yield takeLatest(
    categoriesTypes.GET_LIST_LEFT_CATEGORIES_LOAD_MORE,
    getLoadMoreListLeftCategories,
  );
  //Right
  yield takeLatest(
    categoriesTypes.GET_LIST_RIGHT_CATEGORIES,
    getListRightCategories,
  );
  yield takeLatest(
    categoriesTypes.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE,
    getLoadMoreListRightCategories,
  );
};
export default watcher();
