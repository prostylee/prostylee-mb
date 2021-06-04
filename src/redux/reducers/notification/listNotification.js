import {createAction} from 'redux-actions';

export const types = {
  //List LIST_NOTIFICATION
  SET_LIST_NOTIFICATION_LOADING: 'SET_LIST_NOTIFICATION_LOADING',
  GET_LIST_NOTIFICATION: 'GET_LIST_NOTIFICATION',
  GET_LIST_NOTIFICATION_SUCCESS: 'GET_LIST_NOTIFICATION_SUCCESS',
  GET_LIST_NOTIFICATION_FAILED: 'GET_LIST_NOTIFICATION_FAILED',
  SET_PAGE_LIST_NOTIFICATION_DEFAULT: 'SET_PAGE_LIST_NOTIFICATION_DEFAULT',
  SET_LIST_NOTIFICATION_LOADING_LOAD_MORE:
    'SET_LIST_NOTIFICATION_LOADING_LOAD_MORE',
  GET_LIST_NOTIFICATION_LOAD_MORE: 'GET_LIST_NOTIFICATION_LOAD_MORE',
  GET_LIST_NOTIFICATION_LOAD_MORE_SUCCESS:
    'GET_LIST_NOTIFICATION_LOAD_MORE_SUCCESS',
  GET_LIST_NOTIFICATION_LOAD_MORE_FAILED:
    'GET_LIST_NOTIFICATION_LOAD_MORE_FAILED',
};

export const actions = {
  //List LIST_NOTIFICATION
  setListNotificationLoading: createAction(types.SET_LIST_NOTIFICATION_LOADING),
  getListNotification: createAction(types.GET_LIST_NOTIFICATION),
  getListNotificationSuccess: createAction(types.GET_LIST_NOTIFICATION_SUCCESS),
  getListNotificationFailed: createAction(types.GET_LIST_NOTIFICATION_FAILED),
  setPageListNotificationDefault: createAction(
    types.SET_PAGE_LIST_NOTIFICATION_DEFAULT,
  ),
  setListNotificationLoadingLoadMore: createAction(
    types.SET_LIST_NOTIFICATION_LOADING_LOAD_MORE,
  ),
  getListNotificationLoadMore: createAction(
    types.GET_LIST_NOTIFICATION_LOAD_MORE,
  ),
  getListNotificationLoadMoreSuccess: createAction(
    types.GET_LIST_NOTIFICATION_LOAD_MORE_SUCCESS,
  ),
  getListNotificationLoadMoreFailed: createAction(
    types.GET_LIST_NOTIFICATION_LOAD_MORE_FAILED,
  ),
};

export const defaultState = {
  //List LIST_NOTIFICATION
  listNotificationLoading: false,
  loadListNotificationMoreLoading: false,
  listNotification: {},
  hasLoadMoreListNotification: false,
  pageListNotification: 0,
  limitListNotification: 12,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List LIST_NOTIFICATION
  [types.SET_LIST_NOTIFICATION_LOADING]: (state, {payload}) => {
    return {...state, listNotificationLoading: payload};
  },
  [types.GET_LIST_NOTIFICATION_SUCCESS]: (state, {payload}) => {
    const {totalPages} = payload;
    return {
      ...state,
      pageListNotificationCategories: PAGE_INIT,
      hasLoadMoreListNotification:
        state.pageListNotification + 1 < totalPages ? true : false,
      listNotification: payload,
    };
  },
  [types.GET_LIST_NOTIFICATION_FAILED]: (state, {payload}) => {
    return {
      ...state,
      listNotification: {},
      hasLoadMoreListNotification: false,
    };
  },
  [types.SET_PAGE_LIST_NOTIFICATION_DEFAULT]: (state, {payload}) => {
    return {...state, pageListNotification: 0};
  },
  [types.SET_LIST_NOTIFICATION_LOADING_LOAD_MORE]: (state, {payload}) => {
    return {...state, loadListNotificationMoreLoading: payload};
  },
  [types.GET_LIST_NOTIFICATION_LOAD_MORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listNotification?.content.concat(content) || [];
    return {
      ...state,
      listNotification: payload,
      pageListNotification: state.pageListNotification + UNIT_INCREASE,
      hasLoadMoreListNotification:
        state.pageListNotification + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_NOTIFICATION_LOAD_MORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
