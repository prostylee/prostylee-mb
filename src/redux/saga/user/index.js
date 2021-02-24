import {call, put, takeLatest} from 'redux-saga/effects';

import {api, authApi} from 'services';
import {userActions, userTypes, commonActions} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import {
  UNKNOWN_MESSAGE,
  SESSION_EXPIRED_MESSAGE,
  SUCCESS,
  BAD_REQUEST,
  SESSION_EXPIRED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from 'constants';
import asyncStorage from 'data/asyncStorage';

import messaging from '@react-native-firebase/messaging';

import configEnv from 'config';
import I18n from 'i18n';

const userSignUp = function* ({
  payload: {fullname, email, password, onSuccess},
}) {
  try {
    const res = yield call(authApi.userSignUp, {
      fullName: fullname,
      username: email,
      password,
    });

    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === SUCCESS) {
      yield asyncStorage.setUserToken(res.data.data);
      yield asyncStorage.setUserName({username: email});
      yield put(userActions.userSignUpSuccess(res.data.data));
      yield onSuccess();
    } else if (res.ok && res.data.status === BAD_REQUEST) {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: I18n.t('existedEmail'),
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: UNKNOWN_MESSAGE,
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userLogin = function* ({payload: {email, password, onSuccess}}) {
  try {
    const res = yield call(authApi.userLogin, {
      appClientId: configEnv.APP_CLIENT_ID,
      appClientSecret: configEnv.APP_CLIENT_SECRET,
      username: email,
      password,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === SUCCESS) {
      yield asyncStorage.setUserToken(res.data.data);
      yield asyncStorage.setUserName({username: email});
      yield put(userActions.userLoginSuccess(res.data.data));
      yield onSuccess();
    } else if (res.ok && res.data.status === SESSION_EXPIRED) {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: I18n.t('incorrectEmailOrPassword'),
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: UNKNOWN_MESSAGE,
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userRefreshToken = function* ({payload: {refreshToken, onSuccess}}) {
  try {
    const res = yield call(authApi.userRefreshToken, {
      refreshToken,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === SUCCESS) {
      yield asyncStorage.setUserToken(res.data.data);
      yield put(userActions.userRefreshTokenSuccess(res.data.data));
      yield onSuccess();
    } else if (res.ok && res.data.status === BAD_REQUEST) {
      //thông báo lỗi từ api trả về
      yield put(userActions.userRefreshTokenFail());
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.error,
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả về
      yield put(userActions.userRefreshTokenFail());
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: UNKNOWN_MESSAGE,
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(userActions.userRefreshTokenFail());
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userForgotPassword = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield call(authApi.userForgotPassword, {
      email,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === SUCCESS) {
      if (res.data.data.data) {
        yield onSuccess();
      } else {
        yield put(commonActions.toggleLoading(false));
        yield showMessage({
          message: I18n.t('unExistedEmail'),
          type: 'danger',
        });
      }
    } else if (res.ok && res.data.status === INTERNAL_SERVER_ERROR) {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: I18n.t('unExistedEmail'),
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả ve
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: UNKNOWN_MESSAGE,
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userVerifyOTP = function* ({payload: {email, otp, onSuccess, onFail}}) {
  try {
    const res = yield call(authApi.userVerifyOTP, {
      email,
      otp,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === SUCCESS) {
      if (res.data.data.data) {
        yield onSuccess();
      } else {
        yield onFail();
      }
    } else if (res.ok && res.data.status === BAD_REQUEST) {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.error,
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả ve
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: UNKNOWN_MESSAGE,
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userChangePassword = function* ({
  payload: {email, password, newPassword, onSuccess},
}) {
  try {
    const res = yield call(authApi.userChangePassword, {
      email,
      password,
      newPassword,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === SUCCESS) {
      yield onSuccess();
    } else if (res.ok && res.data.status === BAD_REQUEST) {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.error,
        type: 'danger',
      });
    } else {
      //thông báo lỗi từ api trả ve
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: UNKNOWN_MESSAGE,
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userLogout = function* ({payload: {token, id}}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(authApi.userLogout);
    // xử lý dữ liệu trả về từ api
    if (res.ok) {
      yield asyncStorage.logOut();
      yield put(commonActions.toggleLoading(false));
      yield put(userActions.userLogOutSuccess());
      yield messaging()
        .unsubscribeFromTopic(`user_${id}`)
        .then(() => console.log('Unsubscribed fom the topic user!'));
      yield messaging()
        .unsubscribeFromTopic('user_all')
        .then(() => console.log('Unsubscribed fom the topic all!'));
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: 'Xảy ra lỗi khi đăng xuất',
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const getUserInfo = function* ({payload: {token, onSuccess}}) {
  try {
    yield call(api.setHeadersRequest, {
      Authorization: `${token.token_type} ${token.access_token}`,
    });
    const res = yield call(authApi.getUserInfo);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      // yield Keychain.setGenericPassword(token);
      yield asyncStorage.setUserToken(token);
      yield asyncStorage.setUserData(res.data.data);
      yield onSuccess(res.data.data);
    } else if (res.ok && res.data.status === 401) {
      //token hết hạn => force logOut
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: SESSION_EXPIRED_MESSAGE,
        type: 'danger',
      });
      yield asyncStorage.logOut();
      yield put(userActions.userLogOutSuccess());
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    yield put(commonActions.toggleLoading(false));
    console.log(e);
    yield showMessage({
      message: UNKNOWN_MESSAGE,
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
    const res = yield call(authApi.updateUserPassword, {
      currentPw,
      newPw,
      confirmPw,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else if (res.ok && res.data.status === 401) {
      //token hết hạn => force logOut
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: SESSION_EXPIRED_MESSAGE,
        type: 'danger',
      });
      yield asyncStorage.logOut();
      yield put(userActions.userLogOutSuccess());
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
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
    const res = yield call(authApi.updateUserAvatar, user_avatar);

    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else if (res.ok && res.data.status === 401) {
      //token hết hạn => force logOut
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: SESSION_EXPIRED_MESSAGE,
        type: 'danger',
      });
      yield asyncStorage.logOut();
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
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const forgotPwGetEmailCode = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield call(authApi.forgotPwGetEmailCode, email);
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const userForgotPw = function* ({
  payload: {email, code, password, confirmPw, onSuccess},
}) {
  try {
    const res = yield call(authApi.userForgotPw, {
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
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: SESSION_EXPIRED_MESSAGE,
        type: 'danger',
      });
      yield asyncStorage.logOut();
      yield put(userActions.userLogOutSuccess());
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const forgotPwCheckEmailCode = function* ({payload: {email, code, onSuccess}}) {
  try {
    const res = yield call(authApi.forgotPwCheckEmailCode, {
      email,
      code,
    });
    // xử lý dữ liệu trả về từ api
    if (res.ok && res.data.status === 200) {
      yield onSuccess(res.data.data);
    } else {
      //thông báo lỗi từ api trả về
      yield put(commonActions.toggleLoading(false));
      yield showMessage({
        message: res.data.errors[0],
        type: 'danger',
      });
    }
  } catch (e) {
    //Lỗi server api
    console.log(e);
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
    });
  }
};

const watcher = function* () {
  yield takeLatest(userTypes.USER_SIGN_UP, userSignUp);
  yield takeLatest(userTypes.USER_LOGIN, userLogin);
  yield takeLatest(userTypes.USER_REFRESH_TOKEN, userRefreshToken);
  yield takeLatest(userTypes.USER_FORGOT_PASSWORD, userForgotPassword);
  yield takeLatest(userTypes.USER_VERIFY_OTP, userVerifyOTP);
  yield takeLatest(userTypes.USER_CHANGE_PASSWORD, userChangePassword);
  // yield takeLatest(userTypes.GET_USER_INFO, getUserInfo);
  // yield takeLatest(userTypes.USER_LOGOUT, userLogout);
};
export default watcher();
