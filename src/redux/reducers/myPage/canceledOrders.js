import {createAction} from 'redux-actions';

export const types = {
  //List user orders
  SET_LIST_CANCELED_ORDERS_LOADING: 'SET_LIST_CANCELED_ORDERS_LOADING',
  SET_LIST_CANCELED_ORDERS_LOADMORE_LOADING:
    'SET_LIST_CANCELED_ORDERS_LOADMORE_LOADING',

  GET_LIST_CANCELED_ORDERS: 'GET_LIST_CANCELED_ORDERS',
  GET_LIST_CANCELED_ORDERS_SUCCESS: 'GET_LIST_CANCELED_ORDERS_SUCCESS',
  GET_LIST_CANCELED_ORDERS_FAILED: 'GET_LIST_CANCELED_ORDERS_FAILED',

  GET_LIST_CANCELED_ORDERS_LOADMORE: 'GET_LIST_CANCELED_ORDERS_LOADMORE',
  GET_LIST_CANCELED_ORDERS_LOADMORE_SUCCESS:
    'GET_LIST_CANCELED_ORDERS_LOADMORE_SUCCESS',
  GET_LIST_CANCELED_ORDERS_LOADMORE_FAILED:
    'GET_LIST_CANCELED_ORDERS_LOADMORE_FAILED',
};

export const actions = {
  //List user orders
  setListCanceledOrdersLoading: createAction(
    types.SET_LIST_CANCELED_ORDERS_LOADING,
  ),
  setListCanceledOrdersLoadmoreLoading: createAction(
    types.SET_LIST_CANCELED_ORDERS_LOADMORE_LOADING,
  ),

  getListCanceledOrders: createAction(types.GET_LIST_CANCELED_ORDERS),
  getListCanceledOrdersSuccess: createAction(
    types.GET_LIST_CANCELED_ORDERS_SUCCESS,
  ),
  getListCanceledOrdersFailed: createAction(
    types.GET_LIST_CANCELED_ORDERS_FAILED,
  ),

  getListCanceledOrdersLoadmore: createAction(
    types.GET_LIST_CANCELED_ORDERS_LOADMORE,
  ),
  getListCanceledOrdersLoadmoreSuccess: createAction(
    types.GET_LIST_CANCELED_ORDERS_LOADMORE_SUCCESS,
  ),
  getListCanceledOrdersLoadmoreFailed: createAction(
    types.GET_LIST_CANCELED_ORDERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List user orders
  listCanceledOrdersLoading: false,
  listCanceledOrdersLoadmoreLoading: false,
  listCanceledOrders: null,
  listCanceledOrdersCurrentPage: 0,
  hasListCanceledOrdersLoadmore: false,
};

export const handleActions = {
  //List user orders

  [types.SET_LIST_CANCELED_ORDERS_LOADING]: (state, {payload}) => {
    return {...state, listCanceledOrdersLoading: payload};
  },
  [types.SET_LIST_CANCELED_ORDERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listCanceledOrdersLoadmoreLoading: payload};
  },
  [types.GET_LIST_CANCELED_ORDERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listCanceledOrders: payload,
      listCanceledOrdersCurrentPage: PAGE_INIT,
      hasListCanceledOrdersLoadmore:
        state.listCanceledOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_CANCELED_ORDERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_CANCELED_ORDERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listCanceledOrders?.content.concat(content) || [];
    return {
      ...state,
      listCanceledOrders: payload,
      listCanceledOrdersCurrentPage:
        state.listCanceledOrdersCurrentPage + UNIT_INCREASE,
      hasListCanceledOrdersLoadmore:
        state.listCanceledOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_CANCELED_ORDERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
