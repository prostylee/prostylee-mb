import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getParentCategories,
  getChildCategories,
} from 'services/api/categoriesApi';
import {postProductActions, postProductTypes} from 'reducers';
import {SUCCESS} from 'constants';

//Left
const getListLeftCategories = function* ({payload}) {
  try {
    yield put(postProductActions.setCategoryLoading(true));
    yield put(postProductActions.setPageCategoryDefault());
    const res = yield call(getParentCategories, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getCategorySuccess(res.data.data));
    } else {
      yield put(postProductActions.getCategoryFail());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setCategoryLoading(false));
  }
};

const getLoadMoreListLeftCategories = function* ({payload}) {
  try {
    yield put(postProductActions.setCategoryMoreLoading(true));
    const res = yield call(getParentCategories, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(postProductActions.getMoreCategorySuccess(res.data.data));
    } else {
      yield put(postProductActions.getMoreCategoryFail());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(postProductActions.setCategoryMoreLoading(false));
  }
};

// const getListRightCategories = function* ({payload}) {
//   try {
//     yield put(categoriesActions.setRightLoading(true));
//     yield put(categoriesActions.setPageRightCategoriesDefault());
//     const res = yield call(getChildCategories, payload);
//     if (res.ok && res.data.status === SUCCESS && !res.data.error) {
//       yield put(categoriesActions.getListRightCategoriesSuccess(res.data.data));
//     } else {
//       yield put(categoriesActions.getListRightCategoriesFailed());
//     }
//   } catch (e) {
//     console.error(e);
//   } finally {
//     yield put(categoriesActions.setRightLoading(false));
//   }
// };

// const getLoadMoreListRightCategories = function* ({payload}) {
//   try {
//     yield put(categoriesActions.setLoadingLoadMoreRightCategories(true));
//     const res = yield call(getChildCategories, payload);
//     if (res.ok && res.data.status === SUCCESS && !res.data.error) {
//       yield put(
//         categoriesActions.getListRightCategoriesLoadMoreSuccess(res.data.data),
//       );
//     } else {
//       yield put(categoriesActions.getListRightCategoriesLoadMoreFailed());
//     }
//   } catch (e) {
//     console.error(e);
//   } finally {
//     yield put(categoriesActions.setLoadingLoadMoreRightCategories(false));
//   }
// };

const watcher = function* () {
  yield takeLatest(postProductTypes.GET_CATEGORY, getListLeftCategories);
  yield takeLatest(
    postProductTypes.GET_MORE_CATEGORY,
    getLoadMoreListLeftCategories,
  );
  // //Right
  // yield takeLatest(
  //   postProductTypes.GET_LIST_RIGHT_CATEGORIES,
  //   getListRightCategories,
  // );
  // yield takeLatest(
  //   postProductTypes.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE,
  //   getLoadMoreListRightCategories,
  // );
};
export default watcher();
