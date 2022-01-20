import {call, put, takeLatest, select} from 'redux-saga/effects';
import {commonActions, userActions, userTypes} from 'reducers';
import {Auth} from 'aws-amplify';
import {
  getProductsByUser,
  getProfile,
  getStatistics,
  getUserPost,
  updateProfile,
  getUserAddress as getUserAddressList,
} from 'services/api/userApi';

import {showMessage} from 'react-native-flash-message';
import {UNKNOWN_MESSAGE, SUCCESS, LIMIT_DEFAULT} from 'constants';

import messaging from '@react-native-firebase/messaging';
import I18n from '../../../i18n';
import authService from '../../../services/authService';

const userSignUp = function* ({
  payload: {fullname, email, password, onSuccess},
}) {
  try {
    const request = {
      username: email,
      password,
      attributes: {
        email,
        name: fullname,
      },
    };

    const {user} = yield Auth.signUp(request);

    yield onSuccess();
  } catch (e) {
    let errorMessage = UNKNOWN_MESSAGE;
    if (e.code === 'InvalidPasswordException') {
      errorMessage = I18n.t('validation.invalid', {
        field: I18n.t('user.password'),
      });
    } else if (e.code === 'UsernameExistsException') {
      errorMessage = I18n.t('validation.duplicated', {
        field: I18n.t('user.email'),
      });
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
      position: 'top',
    });
  }
};

const userSignIn = function* ({payload: {email, password, onSuccess, onFail}}) {
  try {
    const user = yield Auth.signIn(email, password);

    yield authService.setUserName({username: user.username});
    yield authService.setAuthUser(user);
    yield fetchProfile({payload: user.attributes['custom:userId']});
    yield put(userActions.userSignInSuccess(user));
    yield onSuccess();
  } catch (e) {
    yield onFail(e.code);
  }
};

const userForgotPassword = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield Auth.forgotPassword(email);

    yield onSuccess();
  } catch (e) {
    let errorMessage = UNKNOWN_MESSAGE;
    if (e.code === 'UserNotFoundException') {
      errorMessage = I18n.t('unExistedEmail');
    } else if (e.code === 'LimitExceededException') {
      errorMessage = I18n.t('tooManyRequest');
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
      position: 'top',
    });
  }
};

const userVerifyOTP = function* ({payload: {email, otp, onSuccess}}) {
  try {
    const res = yield Auth.confirmSignUp(email, otp);

    yield onSuccess();
  } catch (e) {
    let errorMessage = UNKNOWN_MESSAGE;
    if (e.code === 'CodeMismatchException') {
      errorMessage = I18n.t('invalidOTP');
    }

    if (e.code === 'NotAuthorizedException') {
      errorMessage = I18n.t('userAlreadyVerified');
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
      position: 'top',
    });
  }
};

const resendOtpSignUp = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield Auth.resendSignUp(email);

    yield onSuccess();
  } catch (e) {
    let errorMessage = UNKNOWN_MESSAGE;
    if (
      e.code === 'InvalidParameterException' ||
      e.code === 'NotAuthorizedException'
    ) {
      errorMessage = I18n.t('userAlreadyVerified');
    } else if (e.code === 'LimitExceededException') {
      errorMessage = I18n.t('tooManyRequest');
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
      position: 'top',
    });
  }
};

const userChangePassword = function* ({
  payload: {email, password, newPassword, onSuccess},
}) {
  try {
    const res = yield Auth.forgotPasswordSubmit(email, password, newPassword);

    yield onSuccess();
  } catch (e) {
    //Lỗi server api

    let errorMessage = UNKNOWN_MESSAGE;
    if (e.code === 'CodeMismatchException') {
      errorMessage = I18n.t('invalidOTP');
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
      position: 'top',
    });
  }
};

const fetchProfile = function* ({payload}) {
  try {
    const res = yield call(getProfile, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(userActions.getProfileSuccess(res.data.data));
    } else {
      yield put(userActions.getProfileFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const getStatisticsOfUser = function* ({payload}) {
  try {
    const res = yield call(getStatistics, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(userActions.getStatisticsSuccess(res.data.data));
    } else {
      yield put(userActions.getStatisticsFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const getPostsOfUser = function* ({payload}) {
  try {
    const res = yield call(getUserPost, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(userActions.getUserPostSuccess(res.data.data));
    } else {
      yield put(userActions.getUserPostFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const getProductByUser = function* ({payload}) {
  try {
    const res = yield call(getProductsByUser, payload);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(userActions.getProductByUserSuccess(res.data.data));
    } else {
      yield put(userActions.getProductByUserFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  }
};

const updateUserProfile = function* ({payload}) {
  yield put(commonActions.toggleLoading(true));
  try {
    const res = yield call(updateProfile, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(userActions.updateUserProfileSuccess(res.data.data));
    } else {
      yield put(userActions.updateUserProfileFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(commonActions.toggleLoading(false));
  }
};

const getUserAddress = function* ({payload}) {
  const getAddressPage = (state) => state.user.addressListPage;
  const addressPage = yield select(getAddressPage);

  yield put(userActions.getUserAddressLoading(true));
  try {
    const res = yield call(getUserAddressList, {
      limit: LIMIT_DEFAULT,
      page: addressPage,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        userActions.getUserAddressSuccess({
          data: res.data.data.content,
          // TODO
          hasMore: false,
        }),
      );
    } else {
      yield put(userActions.getUserAddressFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(userActions.getUserAddressLoading(false));
  }
};

const getUserAddressMore = function* ({payload}) {
  const getAddressPage = (state) => state.user.addressListPage;
  const addressPage = yield select(getAddressPage);

  yield put(userActions.getUserAddressMoreLoading(true));
  try {
    const res = yield call(getUserAddressList, {
      limit: LIMIT_DEFAULT,
      page: addressPage,
    });
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(
        userActions.getUserAddressMoreSuccess({
          data: res.data.data.content,
          // TODO
          hasMore: false,
        }),
      );
    } else {
      yield put(userActions.getUserAddressMoreFail());
    }
  } catch (e) {
    showMessage({
      message: I18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(userActions.getUserAddressMoreLoading(false));
  }
};

const userLogout = function* ({payload}) {
  try {
    const user = yield Auth.currentAuthenticatedUser();
    if (user?.attributes?.sub) {
      messaging()
        .unsubscribeFromTopic(`user_${user.attributes.sub}`)
        .then(() => {});
    } else if (user?.signInUserSession?.idToken) {
      messaging()
        .unsubscribeFromTopic(
          `user_${user.signInUserSession.idToken.payload.sub}`,
        )
        .then(() => {});
    }
    yield authService.logOut();
    yield put(userActions.userLogOutSuccess());
    yield put(commonActions.toggleLoading(false));

    yield messaging()
      .unsubscribeFromTopic('user_all')
      .then(() => {});
  } catch (e) {
    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: UNKNOWN_MESSAGE,
      type: 'danger',
      position: 'top',
    });
  }
};

const watcher = function* () {
  yield takeLatest(userTypes.USER_SIGN_UP, userSignUp);
  yield takeLatest(userTypes.USER_RESEND_OTP_SIGN_UP, resendOtpSignUp);
  yield takeLatest(userTypes.USER_LOGIN, userSignIn);
  yield takeLatest(userTypes.USER_FORGOT_PASSWORD, userForgotPassword);
  yield takeLatest(userTypes.USER_VERIFY_OTP, userVerifyOTP);
  yield takeLatest(userTypes.USER_CHANGE_PASSWORD, userChangePassword);
  yield takeLatest(userTypes.USER_LOGOUT, userLogout);
  yield takeLatest(userTypes.GET_PROFILE, fetchProfile);
  yield takeLatest(userTypes.GET_STATISTICS, getStatisticsOfUser);
  yield takeLatest(userTypes.GET_POSTS_OF_USER, getPostsOfUser);
  yield takeLatest(userTypes.GET_PRODUCT_BY_USER, getProductByUser);
  yield takeLatest(userTypes.UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(userTypes.GET_USER_ADDRESS, getUserAddress);
  yield takeLatest(userTypes.GET_USER_ADDRESS_MORE, getUserAddressMore);
};

export default watcher();
