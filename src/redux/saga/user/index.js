import {call, put, takeLatest} from 'redux-saga/effects';
import {commonActions, userActions, userTypes} from 'reducers';
import {Auth} from 'aws-amplify';
import {getProductsByUser, getProfile, getStatistics, getUserPost,} from 'services/api/userApi';

import {showMessage} from 'react-native-flash-message';
import {UNKNOWN_MESSAGE} from 'constants';

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
    console.log('Request ' + request);
    const {user} = yield Auth.signUp(request);
    console.log('Auth.signUp  ' + JSON.stringify(user));
    yield onSuccess();
  } catch (e) {
    console.log(e);

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
    });
  }
};

const userSignIn = function* ({payload: {email, password, onSuccess, onFail}}) {
  try {
    const user = yield Auth.signIn(email, password);
    console.log('Sign-in successfully!!!');
    yield authService.setUserName({username: user.username});
    yield authService.setAuthUser(user);
    yield put(userActions.userSignInSuccess(user));
    yield onSuccess();
  } catch (e) {
    console.log(e);
    yield onFail(e.code);
  }
};

const userForgotPassword = function* ({payload: {email, onSuccess}}) {
  try {
    const res = yield Auth.forgotPassword(email);
    console.log('Auth.forgotPassword ' + res);
    yield onSuccess();
  } catch (e) {
    console.log(e);

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
    });
  }
};

const userVerifyOTP = function* ({payload: {email, otp, onSuccess}}) {
  try {
    const res = yield Auth.confirmSignUp(email, otp);
    console.log('Verify successful ' + JSON.stringify(res));
    yield onSuccess();
  } catch (e) {
    console.log(e);

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
    });
  }
};

const resendOtpSignUp = function* ({payload: {email, onSuccess}}) {
  console.log('Auth.resendOtpSignUp ' + email);
  try {
    const res = yield Auth.resendSignUp(email);
    console.log('Auth.resendOtpSignUp ' + JSON.stringify(res));
    yield onSuccess();
  } catch (e) {
    console.log(e);

    let errorMessage = UNKNOWN_MESSAGE;
    if (e.code === 'InvalidParameterException' || e.code === 'NotAuthorizedException') {
      errorMessage = I18n.t('userAlreadyVerified');
    } else if (e.code === 'LimitExceededException') {
      errorMessage = I18n.t('tooManyRequest');
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
    });
  }
};

const userChangePassword = function* ({
  payload: {email, password, newPassword, onSuccess},
}) {
  try {
    const res = yield Auth.forgotPasswordSubmit(email, password, newPassword);
    console.log('Auth.forgotPasswordSubmit ' + res);
    yield onSuccess();
  } catch (e) {
    //Lỗi server api
    console.log(e);

    let errorMessage = UNKNOWN_MESSAGE;
    if (e.code === 'CodeMismatchException') {
      errorMessage = I18n.t('invalidOTP');
    }

    yield put(commonActions.toggleLoading(false));
    yield showMessage({
      message: errorMessage,
      type: 'danger',
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
    console.error(e);
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
    console.error(e);
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
    console.error(e);
  }
};

const getProductByUser = function* ({payload}) {
  try {
    const res = yield call(getProductsByUser, payload);
    console.log(res);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(userActions.getProductByUserSuccess(res.data.data));
    } else {
      yield put(userActions.getProductByUserFail());
    }
  } catch (e) {
    console.error(e);
  }
};

const userLogout = function* ({payload}) {
  try {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        messaging()
          .unsubscribeFromTopic(`user_${user.idToken.payload.sub}`)
          .then(() => console.log('Unsubscribed fom the topic user!'));
      })
      .catch((err) => console.log(err));

    yield authService.logOut();
    yield put(userActions.userLogOutSuccess());
    yield put(commonActions.toggleLoading(false));

    yield messaging()
      .unsubscribeFromTopic('user_all')
      .then(() => console.log('Unsubscribed fom the topic all!'));
  } catch (e) {
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
};

export default watcher();
