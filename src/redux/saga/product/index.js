import {call, select, put, takeLatest, delay} from 'redux-saga/effects';

import {productApi} from 'services';
import {
  productActions,
  productTypes,
  productSelectors,
  userActions,
  commonActions,
} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import * as CONTANTS from 'constants';
import authService from '../../../services/authService';
import {SUCCESS} from 'constants';
import {getListProductService} from 'services/api/productApi';

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
      yield authService.logOut();
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

//List product from categories
const getListProduct = function* ({payload}) {
  try {
    yield put(productActions.setListProductLoading(true));
    yield put(productActions.setPageProductDefault());
    const res = yield call(getListProductService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(productActions.getListProductSuccess(res.data.data));
    } else {
      yield put(productActions.getListProductFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(productActions.setListProductLoading(false));
  }
};

const getLoadMoreListProduct = function* ({payload}) {
  try {
    yield put(productActions.setLoadingLoadMoreProduct(true));
    const res = yield call(getListProductService, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(productActions.getListProductLoadMoreSuccess(res.data.data));
    } else {
      yield put(productActions.getListProductLoadMoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(productActions.setLoadingLoadMoreProduct(false));
  }
};

const watcher = function* () {
  // yield takeLatest(productType.GET_PRODUCTS, getCustomerList);
  //List product from categories
  yield takeLatest(productTypes.GET_LIST_PRODUCT, getListProduct);
  yield takeLatest(
    productTypes.GET_LIST_PRODUCT_LOAD_MORE,
    getLoadMoreListProduct,
  );
};
export default watcher();
