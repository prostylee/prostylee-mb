import {createAction, handleActions} from 'redux-actions';

export const types = {
  USER_SIGN_UP: 'USER_SIGN_UP',
  USER_RESEND_OTP_SIGN_UP: 'USER_RESEND_OTP_SIGN_UP',
  USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',

  USER_CLEAR_EXPIRED_TOKEN: 'USER_CLEAR_EXPIRED_TOKEN',

  USER_FORGOT_PASSWORD: 'USER_FORGOT_PASSWORD',
  USER_VERIFY_OTP: 'USER_VERIFY_OTP',
  USER_CHANGE_PASSWORD: 'USER_CHANGE_PASSWORD',

  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',

  GET_USER_INFO: 'GET_USER_INFO',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL',

  GET_DYNAMIC_USERS: 'GET_DYNAMIC_USERS',
  GET_DYNAMIC_USERS_SUCCESS: 'GET_DYNAMIC_USERS_SUCCESS',
  GET_DYNAMIC_USERS_FAIL: 'GET_DYNAMIC_USERS_FAIL',

  GET_PROFILE: 'GET_PROFILE',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAIL: 'GET_PROFILE_FAIL',

  GET_STATISTICS: 'GET_STATISTICS',
  GET_STATISTICS_SUCCESS: 'GET_STATISTICS_SUCCESS',
  GET_STATISTICS_FAIL: 'GET_STATISTICS_FAIL',

  GET_POSTS_OF_USER: 'GET_POSTS_OF_USER',
  GET_POSTS_OF_USER_SUCCESS: 'GET_POSTS_OF_USER_SUCCESS',
  GET_POSTS_OF_USER_FAIL: 'GET_POSTS_OF_USER_FAIL',

  GET_PRODUCT_BY_USER: 'GET_PRODUCT_BY_USER',
  GET_PRODUCT_BY_USER_SUCCESS: 'GET_PRODUCT_BY_USER_SUCCESS',
  GET_PRODUCT_BY_USER_FAIL: 'GET_PRODUCT_BY_USER_FAIL',
};

export const actions = {
  userSignIn: createAction(types.USER_LOGIN),
  userSignInSuccess: createAction(types.USER_LOGIN_SUCCESS),
  userSignUp: createAction(types.USER_SIGN_UP),
  resendOtpSignUp: createAction(types.USER_RESEND_OTP_SIGN_UP),
  userSignUpSuccess: createAction(types.USER_SIGNUP_SUCCESS),
  userClearExpiredToken: createAction(types.USER_CLEAR_EXPIRED_TOKEN),
  userForgotPassword: createAction(types.USER_FORGOT_PASSWORD),
  userVerifyOTP: createAction(types.USER_VERIFY_OTP),
  userChangePassword: createAction(types.USER_CHANGE_PASSWORD),
  userLogout: createAction(types.USER_LOGOUT),
  userLogOutSuccess: createAction(types.USER_LOGOUT_SUCCESS),
  getUserInfo: createAction(types.GET_USER_INFO),
  getUserInfoSuccess: createAction(types.GET_USER_INFO_SUCCESS),
  getUserInfoFail: createAction(types.GET_USER_INFO_FAIL),
  getDynamicUser: createAction(types.GET_DYNAMIC_USERS),
  getDynamicUserSuccess: createAction(types.GET_DYNAMIC_USERS_SUCCESS),
  getDynamicUserFail: createAction(types.GET_DYNAMIC_USERS_FAIL),
  getProfile: createAction(types.GET_PROFILE),
  getProfileSuccess: createAction(types.GET_PROFILE_SUCCESS),
  getProfileFail: createAction(types.GET_PROFILE_FAIL),
  getStatistics: createAction(types.GET_STATISTICS),
  getStatisticsSuccess: createAction(types.GET_STATISTICS_SUCCESS),
  getStatisticsFail: createAction(types.GET_STATISTICS_FAIL),
  getUserPost: createAction(types.GET_POSTS_OF_USER),
  getUserPostSuccess: createAction(types.GET_POSTS_OF_USER_SUCCESS),
  getUserPostFail: createAction(types.GET_POSTS_OF_USER_FAIL),
  getProductByUser: createAction(types.GET_PRODUCT_BY_USER),
  getProductByUserSuccess: createAction(types.GET_PRODUCT_BY_USER_SUCCESS),
  getProductByUserFail: createAction(types.GET_PRODUCT_BY_USER_FAIL),
};

export const selectors = {
  getUser: (state) => state.user.user,
  getUserToken: (state) => state.user.userToken,
};

const defaultState = {
  user: null,
  dynamicUsers: {},
  userToken: null,
  profile: null,
  statistics: null,
  postsOfUser: null,
  productsByUser: null,
};

export default handleActions(
  {
    [types.USER_LOGIN_SUCCESS]: (state, {payload}) => {
      return {...state, userToken: payload};
    },
    [types.USER_SIGNUP_SUCCESS]: (state, {payload}) => {
      return {...state, userToken: payload};
    },
    [types.USER_RESEND_OTP_SIGN_UP]: (state, {payload}) => {
      return {...state, userToken: payload};
    },
    [types.USER_CLEAR_EXPIRED_TOKEN]: (state, {payload}) => {
      return {...state, userToken: null};
    },
    [types.GET_USER_INFO_SUCCESS]: (state, {payload}) => {
      return {...state, user: payload, isLoading: false};
    },
    [types.GET_USER_INFO_SUCCESS]: (state, {payload}) => {
      return {...state, user: payload, isLoading: false};
    },
    [types.GET_USER_INFO_FAIL]: (state, {payload}) => {
      return {...state, user: null};
    },
    [types.USER_LOGOUT_SUCCESS]: (state, {payload}) => {
      return {...state, isLoading: false, user: null, userToken: null};
    },
    [types.GET_DYNAMIC_USERS_SUCCESS]: (state, {payload}) => {
      return {...state, isLoading: false, dynamicUsers: payload};
    },
    [types.GET_DYNAMIC_USERS_FAIL]: (state, {payload}) => {
      return {...state, isLoading: false, dynamicUsers: {}};
    },
    [types.GET_PROFILE_SUCCESS]: (state, {payload}) => {
      return {...state, profile: payload};
    },
    [types.GET_PROFILE_FAIL]: (state, {payload}) => {
      return {...state, profile: null};
    },
    [types.GET_STATISTICS_SUCCESS]: (state, {payload}) => {
      return {...state, statistics: payload};
    },
    [types.GET_STATISTICS_FAIL]: (state, {payload}) => {
      return {...state, statistics: null};
    },
    [types.GET_POSTS_OF_USER_SUCCESS]: (state, {payload}) => {
      return {...state, postsOfUser: payload};
    },
    [types.GET_POSTS_OF_USER_FAIL]: (state, {payload}) => {
      return {...state, postsOfUser: null};
    },
    [types.GET_PRODUCT_BY_USER_SUCCESS]: (state, {payload}) => {
      return {...state, productsByUser: payload};
    },
    [types.GET_PRODUCT_BY_USER_FAIL]: (state, {payload}) => {
      return {...state, productsByUser: null};
    },
  },
  defaultState,
);
