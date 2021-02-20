import {createAction, handleActions} from 'redux-actions';

export const types = {
  CHECK_EMAIL_EXISTED: 'CHECK_EMAIL_EXISTED',

  USER_SIGN_UP: 'USER_SIGN_UP',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',

  GET_USER_INFO: 'GET_USER_INFO',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL',

  GET_DYNAMIC_USERS: 'GET_DYNAMIC_USERS',
  GET_DYNAMIC_USERS_SUCCESS: 'GET_DYNAMIC_USERS_SUCCESS',
  GET_DYNAMIC_USERS_FAIL: 'GET_DYNAMIC_USERS_FAIL',
};

export const actions = {
  checkEmailExisted: createAction(types.CHECK_EMAIL_EXISTED),
  userLogin: createAction(types.USER_LOGIN),
  userLoginSuccess: createAction(types.GET_USER_INFO_SUCCESS),
  userLoginFail: createAction(types.USER_LOGIN_FAIL),
  userSignUp: createAction(types.USER_SIGN_UP),
  userLogout: createAction(types.USER_LOGOUT),
  userLogOutSuccess: createAction(types.USER_LOGOUT_SUCCESS),
  getUserInfo: createAction(types.GET_USER_INFO),
  getUserInfoSuccess: createAction(types.GET_USER_INFO_SUCCESS),
  getUserInfoFail: createAction(types.GET_USER_INFO_FAIL),
  getDynamicUser: createAction(types.GET_DYNAMIC_USERS),
  getDynamicUserSuccess: createAction(types.GET_DYNAMIC_USERS_SUCCESS),
  getDynamicUserFail: createAction(types.GET_DYNAMIC_USERS_FAIL),
};

export const selectors = {
  getUser: (state) => state.user.user,
};

const defaultState = {
  user: null,
  dynamicUsers: {},
};

export default handleActions(
  {
    [types.GET_USER_INFO_SUCCESS]: (state, {payload}) => {
      return {...state, user: payload, isLoading: false};
    },
    [types.GET_USER_INFO_FAIL]: (state, {payload}) => {
      return {...state, user: null};
    },
    [types.USER_LOGOUT_SUCCESS]: (state, {payload}) => {
      return {...state, isLoading: false, user: null};
    },
    [types.GET_DYNAMIC_USERS_SUCCESS]: (state, {payload}) => {
      return {...state, isLoading: false, dynamicUsers: payload};
    },
    [types.GET_DYNAMIC_USERS_FAIL]: (state, {payload}) => {
      return {...state, isLoading: false, dynamicUsers: {}};
    },
  },
  defaultState,
);
