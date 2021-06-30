import {createAction} from 'redux-actions';

export const types = {
  //List product from sale
  SET_LIST_USER_POST_LOADING: 'SET_LIST_USER_POST_LOADING',
  SET_LIST_USER_POST_LOADMORE_LOADING: 'SET_LIST_USER_POST_LOADMORE_LOADING',

  GET_LIST_USER_POST: 'GET_LIST_USER_POST',
  GET_LIST_USER_POST_SUCCESS: 'GET_LIST_USER_POST_SUCCESS',
  GET_LIST_USER_POST_FAILED: 'GET_LIST_USER_POST_FAILED',

  GET_LIST_USER_POST_LOADMORE: 'GET_LIST_USER_POST_LOADMORE',
  GET_LIST_USER_POST_LOADMORE_SUCCESS: 'GET_LIST_USER_POST_LOADMORE_SUCCESS',
  GET_LIST_USER_POST_LOADMORE_FAILED: 'GET_LIST_USER_POST_LOADMORE_FAILED',
};

export const actions = {
  //List product from sale
  setListUserPostLoading: createAction(types.SET_LIST_USER_POST_LOADING),
  setListUserPostLoadmoreLoading: createAction(
    types.SET_LIST_USER_POST_LOADMORE_LOADING,
  ),

  getListUserPost: createAction(types.GET_LIST_USER_POST),
  getListUserPostSuccess: createAction(types.GET_LIST_USER_POST_SUCCESS),
  getListUserPostFailed: createAction(types.GET_LIST_USER_POST_FAILED),

  getListUserPostLoadmore: createAction(types.GET_LIST_USER_POST_LOADMORE),
  getListUserPostLoadmoreSuccess: createAction(
    types.GET_LIST_USER_POST_LOADMORE_SUCCESS,
  ),
  getListUserPostLoadmoreFailed: createAction(
    types.GET_LIST_USER_POST_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List product from sale
  listUserPostLoading: false,
  listUserPostLoadmoreLoading: false,
  listUserPost: null,
  listUserPostCurrentPage: 0,
  hasListUserPostLoadmore: false,
};

export const handleActions = {
  //List product from sale

  [types.SET_LIST_USER_POST_LOADING]: (state, {payload}) => {
    return {...state, listUserPostLoading: payload};
  },
  [types.SET_LIST_USER_POST_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listUserPostLoadmoreLoading: payload};
  },
  [types.GET_LIST_USER_POST_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listUserPost: payload,
      listUserPostCurrentPage: PAGE_INIT,
      hasListUserPostLoadmore:
        state.listUserPostCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_USER_POST_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_USER_POST_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listUserPost?.content.concat(content) || [];
    return {
      ...state,
      listUserPost: payload,
      listUserPostCurrentPage: state.listUserPostCurrentPage + UNIT_INCREASE,
      hasListUserPostLoadmore:
        state.listUserPostCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_USER_POST_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
