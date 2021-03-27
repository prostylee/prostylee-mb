import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'SET_LOADING',
  GET_DYNAMIC_USERS: 'GET_DYNAMIC_USERS',
  GET_DYNAMIC_USERS_SUCCESS: 'GET_DYNAMIC_USERS_SUCCESS',
  GET_DYNAMIC_USERS_FAIL: 'GET_DYNAMIC_USERS_FAIL',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  getDynamicUser: createAction(types.GET_DYNAMIC_USERS),
  getDynamicUserSuccess: createAction(types.GET_DYNAMIC_USERS_SUCCESS),
  getDynamicUserFail: createAction(types.GET_DYNAMIC_USERS_FAIL),
};

const intialState = {
  isLoading: false,
  dynamicUsers: {},
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.GET_DYNAMIC_USERS_SUCCESS]: (state, {payload}) => {
      return {...state, dynamicUsers: payload};
    },
    [types.GET_DYNAMIC_USERS_FAIL]: (state, {payload}) => {
      return {...state, dynamicUsers: {}};
    },
  },
  intialState,
);
