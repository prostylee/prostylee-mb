import {createAction, handleActions} from 'redux-actions';

export const types = {
  USER_SIGN_UP: 'USER_SIGN_UP',
  USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',

  USER_REFRESH_TOKEN: 'USER_REFRESH_TOKEN',
  USER_REFRESH_TOKEN_SUCCESS: 'USER_REFRESH_TOKEN_SUCCESS',

  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',

  GET_USER_INFO: 'GET_USER_INFO',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL',
};

export const actions = {
  userLogin: createAction(types.USER_LOGIN),
  userLoginSuccess: createAction(types.USER_LOGIN_SUCCESS),
  userSignUp: createAction(types.USER_SIGN_UP),
  userSignUpSuccess: createAction(types.USER_SIGNUP_SUCCESS),
  userRefreshToken: createAction(types.USER_REFRESH_TOKEN),
  userRefreshTokenSuccess: createAction(types.USER_REFRESH_TOKEN_SUCCESS),
  userLogout: createAction(types.USER_LOGOUT),
  userLogOutSuccess: createAction(types.USER_LOGOUT_SUCCESS),
  getUserInfo: createAction(types.GET_USER_INFO),
  getUserInfoSuccess: createAction(types.GET_USER_INFO_SUCCESS),
  getUserInfoFail: createAction(types.GET_USER_INFO_FAIL),
};

export const selectors = {
  getUser: (state) => state.user.user,
  getUserToken: (state) => state.user.userToken,
};

const defaultState = {
  user: null,
  userToken: null,
};

export default handleActions(
  {
    [types.USER_LOGIN_SUCCESS]: (state, {payload}) => {
      return {...state, userToken: payload};
    },
    [types.USER_SIGNUP_SUCCESS]: (state, {payload}) => {
      return {...state, userToken: payload};
    },
    [types.USER_REFRESH_TOKEN_SUCCESS]: (state, {payload}) => {
      return {...state, userToken: payload};
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
  },
  defaultState,
);
