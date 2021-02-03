import {call, select, put, takeLatest, delay} from 'redux-saga/effects';

import {api, productApi} from 'services';
import {
  productActions,
  productTypes,
  productSelectors,
  userActions,
  commonActions,
} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import * as CONTANTS from 'constants';
import asyncStorage from 'data/asyncStorage';

const getProducts = function* ({payload: {token, isRefresh}}) {
  try {
    var page;
    if (isRefresh) {
      //load lại page đầu tiên => page = 1
      page = 1;
    } else {
      //load page tiếp theo => page = currentPage + 1
      const currentPage = yield select(productSelectors.getCurrentPageProduct);
      page = currentPage + 1;
    }
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(productApi.getProducts, page);

    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === CONTANTS.SUCCESS) {
      yield put(
        productActions.getProductsSuccess({
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
      });
      yield asyncStorage.logOut();
      yield put(userActions.userLogOutSuccess());
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: 'Lỗi khi tải danh sách khách hàng',
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: CONTANTS.UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const watcher = function* () {
  // yield takeLatest(productType.GET_PRODUCTS, getCustomerList);
};
export default watcher();
