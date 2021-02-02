import {call, put, takeLatest} from 'redux-saga/effects';

import {api} from 'services';
import {userActions, userTypes, dataActions} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import {errMsg, sessionExpired} from 'config';
import AsyncStorage from 'data/AsyncStorage';

import messaging from '@react-native-firebase/messaging';

const checkEmailExisted = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield call(api.checkEmailExisted, email);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data.number);
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
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

const signUpGetEmailCode = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield call(api.signUpGetEmailCode, email);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
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

const signUpCheckEmailCode = function* ({payload: {email, code, onSuccess}}) {
  try {
    const res = yield call(api.signUpCheckEmailCode, {
      email,
      code,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
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

const userSignUp = function* ({
  payload: {fullname, phone_number, email, password, city_id, code, onSuccess},
}) {
  try {
    const res = yield call(api.userSignUp, {
      fullname,
      phone_number,
      email,
      password,
      city_id,
      code,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    yield put(dataActions.toggleLoading(false));
    yield showMessage({
      message: errMsg,
      type: 'danger',
    });
  }
};

const userLogin = function* ({payload: {email, password, onSuccess}}) {
  try {
    const res = yield call(api.userLogin, {email, password});
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else if (res.ok && res.data.status === 400) {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: 'Mật khẩu không đúng',
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: 'Xảy ra lỗi khi đăng nhập',
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

const userLogout = function* ({payload: {token, id}}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(api.userLogout);
    // xử lý dữ liệu trả về từ api
    if (res.ok) {
      yield AsyncStorage.logOut();
      yield put(dataActions.toggleLoading(false));
      yield put(userActions.userLogOutSuccess());
      yield messaging()
        .unsubscribeFromTopic(`user_${id}`)
        .then(() => console.log('Unsubscribed fom the topic user!'));
      yield messaging()
        .unsubscribeFromTopic('user_all')
        .then(() => console.log('Unsubscribed fom the topic all!'));
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: 'Xảy ra lỗi khi đăng xuất',
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

const getUserInfo = function* ({payload: {token, onSuccess}}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(api.getUserInfo);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      // yield Keychain.setGenericPassword(token);
      yield AsyncStorage.setUserToken(token);
      yield AsyncStorage.setUserData(res.data.data);
      yield onSuccess(res.data.data);
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
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    yield put(dataActions.toggleLoading(false));
    console.log(e);
    yield showMessage({
      message: errMsg,
      type: 'danger',
    });
  }
};

const updateUserPassword = function* ({
  payload: {token, currentPw, newPw, confirmPw, onSuccess},
}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(api.updateUserPassword, {
      currentPw,
      newPw,
      confirmPw,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
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
        message: res.data.errors[0],
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

const updateUserAvatar = function* ({
  payload: {token, user_avatar, onSuccess, onFail},
}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    });
    const res = yield call(api.updateUserAvatar, user_avatar);

    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
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
      yield onFail();
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield onFail();
    yield showMessage({
      message: errMsg,
      type: 'danger',
    });
  }
};

const forgotPwGetEmailCode = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield call(api.forgotPwGetEmailCode, email);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
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

const userForgotPw = function* ({
  payload: {email, code, password, confirmPw, onSuccess},
}) {
  try {
    const res = yield call(api.userForgotPw, {
      email,
      code,
      password,
      confirmPw,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
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
        message: res.data.errors[0],
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

const forgotPwCheckEmailCode = function* ({payload: {email, code, onSuccess}}) {
  try {
    const res = yield call(api.forgotPwCheckEmailCode, {
      email,
      code,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(dataActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
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

const activeAccount = function* ({payload: {token, code, onSuccess, onFail}}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(api.activeAccount, code);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
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
      yield onFail(res.data.errors[0]);
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield onFail(errMsg);
  }
};

const watcher = function* () {
  // yield takeLatest(userTypes.CHECK_EMAIL_EXISTED, checkEmailExisted);
  // yield takeLatest(userTypes.USER_SIGN_UP, userSignUp);
  // yield takeLatest(userTypes.SIGN_UP_GET_EMAIL_CODE, signUpGetEmailCode);
  // yield takeLatest(userTypes.SIGN_UP_CHECK_EMAIL_CODE, signUpCheckEmailCode);
  // yield takeLatest(userTypes.USER_LOGIN, userLogin);
  // yield takeLatest(userTypes.GET_USER_INFO, getUserInfo);
  // yield takeLatest(userTypes.USER_LOGOUT, userLogout);
};
export default watcher();
