import {createAction} from 'redux-actions';

export const types = {
  //List user orders
  SET_LIST_RECEIVE_ORDERS_LOADING: 'SET_LIST_RECEIVE_ORDERS_LOADING',
  SET_LIST_RECEIVE_ORDERS_LOADMORE_LOADING:
    'SET_LIST_RECEIVE_ORDERS_LOADMORE_LOADING',

  GET_LIST_RECEIVE_ORDERS: 'GET_LIST_RECEIVE_ORDERS',
  GET_LIST_RECEIVE_ORDERS_SUCCESS: 'GET_LIST_RECEIVE_ORDERS_SUCCESS',
  GET_LIST_RECEIVE_ORDERS_FAILED: 'GET_LIST_RECEIVE_ORDERS_FAILED',

  GET_LIST_RECEIVE_ORDERS_LOADMORE: 'GET_LIST_RECEIVE_ORDERS_LOADMORE',
  GET_LIST_RECEIVE_ORDERS_LOADMORE_SUCCESS:
    'GET_LIST_RECEIVE_ORDERS_LOADMORE_SUCCESS',
  GET_LIST_RECEIVE_ORDERS_LOADMORE_FAILED:
    'GET_LIST_RECEIVE_ORDERS_LOADMORE_FAILED',
};

export const actions = {
  //List user orders
  setListReceiveOrdersLoading: createAction(
    types.SET_LIST_RECEIVE_ORDERS_LOADING,
  ),
  setListReceiveOrdersLoadmoreLoading: createAction(
    types.SET_LIST_RECEIVE_ORDERS_LOADMORE_LOADING,
  ),

  getListReceiveOrders: createAction(types.GET_LIST_RECEIVE_ORDERS),
  getListReceiveOrdersSuccess: createAction(
    types.GET_LIST_RECEIVE_ORDERS_SUCCESS,
  ),
  getListReceiveOrdersFailed: createAction(
    types.GET_LIST_RECEIVE_ORDERS_FAILED,
  ),

  getListReceiveOrdersLoadmore: createAction(
    types.GET_LIST_RECEIVE_ORDERS_LOADMORE,
  ),
  getListReceiveOrdersLoadmoreSuccess: createAction(
    types.GET_LIST_RECEIVE_ORDERS_LOADMORE_SUCCESS,
  ),
  getListReceiveOrdersLoadmoreFailed: createAction(
    types.GET_LIST_RECEIVE_ORDERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List user orders
  listReceiveOrdersLoading: false,
  listReceiveOrdersLoadmoreLoading: false,
  listReceiveOrders: null,
  listReceiveOrdersCurrentPage: 0,
  hasListReceiveOrdersLoadmore: false,
};

export const handleActions = {
  //List user orders

  [types.SET_LIST_RECEIVE_ORDERS_LOADING]: (state, {payload}) => {
    return {...state, listReceiveOrdersLoading: payload};
  },
  [types.SET_LIST_RECEIVE_ORDERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listReceiveOrdersLoadmoreLoading: payload};
  },
  [types.GET_LIST_RECEIVE_ORDERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listReceiveOrders: payload,
      listReceiveOrdersCurrentPage: PAGE_INIT,
      hasListReceiveOrdersLoadmore:
        state.listReceiveOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_RECEIVE_ORDERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_RECEIVE_ORDERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listReceiveOrders?.content.concat(content) || [];
    return {
      ...state,
      listReceiveOrders: payload,
      listReceiveOrdersCurrentPage:
        state.listReceiveOrdersCurrentPage + UNIT_INCREASE,
      hasListReceiveOrdersLoadmore:
        state.listReceiveOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_RECEIVE_ORDERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
