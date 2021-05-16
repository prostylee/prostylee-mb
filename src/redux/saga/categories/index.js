import {call, put, takeLatest} from 'redux-saga/effects';
import {getParentCategories} from 'services/api/categoriesApi';
import {categoriesActions, categoriesTypes} from 'reducers';
import {SUCCESS} from 'constants';

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
    console.error(e);
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
    console.error(e);
  } finally {
    yield put(categoriesActions.setLoadingLoadMoreLeftCategories(false));
  }
};

const watcher = function* () {
  yield takeLatest(
    categoriesTypes.GET_LIST_LEFT_CATEGORIES,
    getListLeftCategories,
  );
  yield takeLatest(
    categoriesTypes.GET_LIST_LEFT_CATEGORIES,
    getLoadMoreListLeftCategories,
  );
};
export default watcher();
