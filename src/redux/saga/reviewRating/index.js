import {call, select, put, takeLatest, delay} from 'redux-saga/effects';

import {reviewRatingApi} from 'services';
import {
  reviewRatingActions,
  reviewRatingTypes,
  reviewRatingSelectors,
  userActions,
  commonActions,
} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import * as CONTANTS from 'constants';
import authService from '../../../services/authService';
import {SUCCESS} from 'constants';
import {getListReviewRatingService} from 'services/api/reviewRatingApi';
import i18n from 'i18n';
const getReviewRatings = function* ({payload: {token, isRefresh}}) {
  try {
    var page;
    if (isRefresh) {
      //load lại page đầu tiên => page = 1
      page = 1;
    } else {
      //load page tiếp theo => page = currentPage + 1
      const currentPage = yield select(
        reviewRatingSelectors.getCurrentPageReviewRating,
      );
      page = currentPage + 1;
    }
    const res = yield call(reviewRatingApi.getListReviewRatingService, page);

    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === CONTANTS.SUCCESS) {
      yield put(
        reviewRatingActions.getReviewRatingsSuccess({
          total: res.data.data.pagination.total,
          list: res.data.data.detail,
          currentPage: page,
          lastPage: res.data.data.pagination.lastPage,
          isRefresh,
        }),
      );
    } else if (res.ok && res.data.status === CONTANTS.SESSION_EXPIRED) {
      //token hết hạn => force logOut
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: CONTANTS.SESSION_EXPIRED_MESSAGE,
        type: 'danger',
        position: 'top',
      });
      yield authService.logOut();
      yield put(userActions.userLogOutSuccess());
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: 'Lỗi khi tải danh sách khách hàng',
        type: 'danger',
        position: 'top',
      });
    }
  } catch (e) {
    //Lỗi server api

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: CONTANTS.UNKNOWN_MESSAGE,
      type: 'danger',
      position: 'top',
    });
  }
};

//List reviewRating from categories
const getListReviewRating = function* ({payload}) {
  try {
    yield put(reviewRatingActions.setListReviewRatingLoading(true));
    yield put(reviewRatingActions.setPageReviewRatingDefault());
    const res = yield call(getListReviewRatingService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(reviewRatingActions.getListReviewRatingSuccess(res.data.data));
    } else {
      yield put(reviewRatingActions.getListReviewRatingFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(reviewRatingActions.setListReviewRatingLoading(false));
  }
};

const getLoadMoreListReviewRating = function* ({payload}) {
  try {
    yield put(reviewRatingActions.setLoadingLoadMoreReviewRating(true));
    const res = yield call(getListReviewRatingService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        reviewRatingActions.getListReviewRatingLoadMoreSuccess(res.data.data),
      );
    } else {
      yield put(reviewRatingActions.getListReviewRatingLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(reviewRatingActions.setLoadingLoadMoreReviewRating(false));
  }
};

const watcher = function* () {
  // yield takeLatest(reviewRatingType.GET_REVIEW_RATINGS, getCustomerList);
  //List reviewRating from categories
  yield takeLatest(
    reviewRatingTypes.GET_LIST_REVIEW_RATING,
    getListReviewRating,
  );
  yield takeLatest(
    reviewRatingTypes.GET_LIST_REVIEW_RATING_LOAD_MORE,
    getLoadMoreListReviewRating,
  );
};
export default watcher();
