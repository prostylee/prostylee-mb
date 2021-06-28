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

  GET_USER_LOCATION: 'GET_USER_LOCATION',
  SET_USER_LOCATION: 'SET_USER_LOCATION',

  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  UDPATE_USER_PROFILE_SUCCESS: 'UDPATE_USER_PROFILE_SUCCESS',
  UPDATE_USER_PROFILE_FAIL: 'UPDATE_USER_PROFILE_FAIL',

  GET_USER_ADDRESS_LOADING: 'GET_USER_ADDRESS_LOADING',
  GET_USER_ADDRESS: 'GET_USER_ADDRESS',
  GET_USER_ADDRESS_SUCCESS: 'GET_USER_ADDRESS_SUCCESS',
  GET_USER_ADDRESS_FAIL: 'GET_USER_ADDRESS_FAIL',

  GET_USER_ADDRESS_MORE_LOADING: 'GET_USER_ADDRESS_MORE_LOADING',
  GET_USER_ADDRESS_MORE: 'GET_USER_ADDRESS_MORE',
  GET_USER_ADDRESS_MORE_SUCCESS: 'GET_USER_ADDRESS_MORE_SUCCESS',
  GET_USER_ADDRESS_MORE_FAIL: 'GET_USER_ADDRESS_MORE_FAIL',
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
  getUserLocation: createAction(types.GET_USER_LOCATION),
  setUserLocation: createAction(types.SET_USER_LOCATION),

  updateUserProfile: createAction(types.UPDATE_USER_PROFILE),
  updateUserProfileSuccess: createAction(types.UDPATE_USER_PROFILE_SUCCESS),
  updateUserProfileFail: createAction(types.UPDATE_USER_PROFILE_FAIL),

  getUserAddressLoading: createAction(types.GET_USER_ADDRESS_LOADING),
  getUserAddress: createAction(types.GET_USER_ADDRESS),
  getUserAddressSuccess: createAction(types.GET_USER_ADDRESS_SUCCESS),
  getUserAddressFail: createAction(types.GET_USER_ADDRESS_FAIL),

  getUserAddressMoreLoading: createAction(types.GET_USER_ADDRESS_MORE_LOADING),
  getUserAddressMore: createAction(types.GET_USER_ADDRESS_MORE),
  getUserAddressMoreSuccess: createAction(types.GET_USER_ADDRESS_MORE_SUCCESS),
  getUserAddressMoreFail: createAction(types.GET_USER_ADDRESS_MORE_FAIL),
};

export const selectors = {
  getUser: (state) => state.user.user,
  getUserToken: (state) => state.user.userToken,
  getUserProfile: (state) => state.user.profile,
  getUserStatistics: (state) => state.user.statistics,
  getUserLocation: (state) => state.user.location,
  getUserAddress: (state) => state.user.addressList,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

const defaultState = {
  user: null,
  dynamicUsers: {},
  userToken: null,
  profile: null,
  statistics: null,
  postsOfUser: null,
  productsByUser: null,
  location: null,

  addressListHasMore: true,
  addressListPage: 0,
  addressList: null,
  addressListLoading: false,
  addressListMoreLoading: false,
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
    [types.SET_USER_LOCATION]: (state, {payload}) => {
      return {
        ...state,
        location: payload,
      };
    },
    [types.UDPATE_USER_PROFILE_SUCCESS]: (state, {payload}) => {
      return {...state, profile: payload};
    },
    [types.UPDATE_USER_PROFILE_FAIL]: (state, {payload}) => {
      return {...state, profile: state.profile};
    },
    [types.GET_USER_ADDRESS_LOADING]: (state, {payload}) => {
      return {...state, addressListLoading: payload};
    },
    [types.GET_USER_ADDRESS_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        addressList: payload.data,
        addressListPage: PAGE_INIT,
        addressListHasMore: payload.hasMore ? payload.hasMore : false,
      };
    },
    [types.GET_USER_ADDRESS_FAIL]: (state, {payload}) => {
      return {...state, addressList: state.addressList};
    },
    [types.GET_USER_ADDRESS_MORE_LOADING]: (state, {payload}) => {
      return {...state, addressListMoreLoading: payload};
    },
    [types.GET_USER_ADDRESS_MORE_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        addressList: payload.data,
        addressListPage: state.addressListPage + UNIT_INCREASE,
        addressListHasMore: payload.hasMore ? payload.hasMore : false,
      };
    },
    [types.GET_USER_ADDRESS_MORE_FAIL]: (state, {payload}) => {
      return {...state, addressList: state.addressList};
    },
  },
  defaultState,
);
