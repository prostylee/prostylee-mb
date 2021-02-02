import {call, select, put, takeLatest, delay} from 'redux-saga/effects';

import {api} from 'services';
import {dataActions, dataTypes, dataSelectors, userActions} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import {errMsg, sessionExpired} from 'config';
import AsyncStorage from 'data/AsyncStorage';

const getCustomerList = function* ({payload: {token, isRefresh}}) {
  try {
    var page;
    if (isRefresh) {
      //load lại page đầu tiên => page = 1
      page = 1;
    } else {
      //load page tiếp theo => page = currentPage + 1
      const currentPage = yield select(
        dataSelectors.getCurrentPageCustomerList,
      );
      page = currentPage + 1;
    }
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(api.getCustomerList, page);

    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield put(
        dataActions.getCustomerListSuccess({
          total: res.data.data.pagination.total,
          list: res.data.data.detail,
          currentPage: page,
          lastPage: res.data.data.pagination.lastPage,
          isRefresh,
        }),
      );
    } else if (res.ok && res.data.status === 401) {
      //token hết hạn => force logOut
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: sessionExpired,
        type: 'danger',
      });
      yield AsyncStorage.logOut();
      yield put(userActions.userLogOutSuccess());
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: 'Lỗi khi tải danh sách khách hàng',
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(dataActions.toggleLoading(false));
    yield showMessage({
      message: errMsg,
      type: 'danger',
    });
  }
};

const watcher = function* () {
  // yield takeLatest(dataTypes.GET_CUSTOMER_LIST, getCustomerList);
};
export default watcher();
