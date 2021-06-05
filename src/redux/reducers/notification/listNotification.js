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

  //List notification discount
  SET_LIST_NOTIFICATION_DISCOUNT_LOADING:
    'SET_LIST_NOTIFICATION_DISCOUNT_LOADING',
  GET_LIST_NOTIFICATION_DISCOUNT: 'GET_LIST_NOTIFICATION_DISCOUNT',
  GET_LIST_NOTIFICATION_DISCOUNT_SUCCESS:
    'GET_LIST_NOTIFICATION_DISCOUNT_SUCCESS',
  GET_LIST_NOTIFICATION_DISCOUNT_FAILED:
    'GET_LIST_NOTIFICATION_DISCOUNT_FAILED',
  SET_PAGE_LIST_NOTIFICATION_DISCOUNT_DEFAULT:
    'SET_PAGE_LIST_NOTIFICATION_DISCOUNT_DEFAULT',
  SET_LIST_NOTIFICATION_DISCOUNT_LOADING_LOAD_MORE:
    'SET_LIST_NOTIFICATION_DISCOUNT_LOADING_LOAD_MORE',
  GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE:
    'GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE',
  GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_SUCCESS:
    'GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_SUCCESS',
  GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_FAILED:
    'GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_FAILED',

  //Mark read
  SET_MARK_AS_READ: 'SET_MARK_AS_READ',
  SET_MARK_ALL_AS_READ: 'SET_MARK_ALL_AS_READ',

  //Delete notification
  DELETE_NOTFICATION: 'DELETE_NOTFICATION',
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

  //List notification discount
  setListNotificationDiscountLoading: createAction(
    types.SET_LIST_NOTIFICATION_DISCOUNT_LOADING,
  ),
  getListNotificationDiscount: createAction(
    types.GET_LIST_NOTIFICATION_DISCOUNT,
  ),
  getListNotificationDiscountSuccess: createAction(
    types.GET_LIST_NOTIFICATION_DISCOUNT_SUCCESS,
  ),
  getListNotificationDiscountFailed: createAction(
    types.GET_LIST_NOTIFICATION_DISCOUNT_FAILED,
  ),
  setPageListNotificationDiscountDefault: createAction(
    types.SET_PAGE_LIST_NOTIFICATION_DISCOUNT_DEFAULT,
  ),
  setListNotificationDiscountLoadingLoadMore: createAction(
    types.SET_LIST_NOTIFICATION_DISCOUNT_LOADING_LOAD_MORE,
  ),
  getListNotificationDiscountLoadMore: createAction(
    types.GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE,
  ),
  getListNotificationDiscountLoadMoreSuccess: createAction(
    types.GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_SUCCESS,
  ),
  getListNotificationDiscountLoadMoreFailed: createAction(
    types.GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_FAILED,
  ),

  //Mark read
  setMarkAsRead: createAction(types.SET_MARK_AS_READ),
  setMarkAllAsRead: createAction(types.SET_MARK_ALL_AS_READ),

  //Delete notification
  deleteNotification: createAction(types.DELETE_NOTFICATION),
};

export const defaultState = {
  //List LIST_NOTIFICATION
  listNotificationLoading: false,
  loadListNotificationMoreLoading: false,
  listNotification: {},
  hasLoadMoreListNotification: false,
  pageListNotification: 0,
  limitListNotification: 12,

  //list notification discount
  listNotificationDiscountLoading: false,
  loadListNotificationDiscountMoreLoading: false,
  listNotificationDiscount: {},
  hasLoadMoreListNotificationDiscount: false,
  pageListNotificationDiscount: 0,
  limitListNotificationDiscount: 12,
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

  //List notification Discount
  [types.SET_LIST_NOTIFICATION_DISCOUNT_LOADING]: (state, {payload}) => {
    return {...state, listNotificationDiscountLoading: payload};
  },
  [types.GET_LIST_NOTIFICATION_DISCOUNT_SUCCESS]: (state, {payload}) => {
    const {totalPages} = payload;
    return {
      ...state,
      pageListNotificationDiscountCategories: PAGE_INIT,
      hasLoadMoreListNotificationDiscount:
        state.pageListNotificationDiscount + 1 < totalPages ? true : false,
      listNotificationDiscount: payload,
    };
  },
  [types.GET_LIST_NOTIFICATION_DISCOUNT_FAILED]: (state, {payload}) => {
    return {
      ...state,
      listNotificationDiscount: {},
      hasLoadMoreListNotificationDiscount: false,
    };
  },
  [types.SET_PAGE_LIST_NOTIFICATION_DISCOUNT_DEFAULT]: (state, {payload}) => {
    return {...state, pageListNotificationDiscount: 0};
  },
  [types.SET_LIST_NOTIFICATION_DISCOUNT_LOADING_LOAD_MORE]: (
    state,
    {payload},
  ) => {
    return {...state, loadListNotificationDiscountMoreLoading: payload};
  },
  [types.GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_SUCCESS]: (
    state,
    {payload},
  ) => {
    const {totalPages, content} = payload;
    payload.content =
      state.listNotificationDiscount?.content.concat(content) || [];
    return {
      ...state,
      listNotificationDiscount: payload,
      pageListNotificationDiscount:
        state.pageListNotificationDiscount + UNIT_INCREASE,
      hasLoadMoreListNotificationDiscount:
        state.pageListNotificationDiscount + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_NOTIFICATION_DISCOUNT_LOAD_MORE_FAILED]: (
    state,
    {payload},
  ) => {
    return {...state};
  },

  //Mark read
  [types.SET_MARK_AS_READ]: (state, {payload}) => {
    const {
      listNotification: {content},
    } = state;
    const objIndex = content.findIndex((item) => item.id == payload);
    content[objIndex].markAsRead = true;
    return {
      ...state,
    };
  },

  [types.SET_MARK_ALL_AS_READ]: (state, {payload}) => {
    const {
      listNotification: {content},
    } = state;
    content.forEach(function (item) {
      item.markAsRead = true;
    });
    return {
      ...state,
    };
  },

  //Delete Notification
  [types.DELETE_NOTFICATION]: (state, {payload}) => {
    const {
      listNotification: {content},
    } = state;
    const newContent = content.filter((item) => item.id !== payload);
    state.listNotification.content = newContent;
    return {
      ...state,
    };
  },
};
