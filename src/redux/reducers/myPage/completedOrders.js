import {createAction} from 'redux-actions';

export const types = {
  //List user orders
  SET_LIST_COMPLETED_ORDERS_LOADING: 'SET_LIST_COMPLETED_ORDERS_LOADING',
  SET_LIST_COMPLETED_ORDERS_LOADMORE_LOADING:
    'SET_LIST_COMPLETED_ORDERS_LOADMORE_LOADING',

  GET_LIST_COMPLETED_ORDERS: 'GET_LIST_COMPLETED_ORDERS',
  GET_LIST_COMPLETED_ORDERS_SUCCESS: 'GET_LIST_COMPLETED_ORDERS_SUCCESS',
  GET_LIST_COMPLETED_ORDERS_FAILED: 'GET_LIST_COMPLETED_ORDERS_FAILED',

  GET_LIST_COMPLETED_ORDERS_LOADMORE: 'GET_LIST_COMPLETED_ORDERS_LOADMORE',
  GET_LIST_COMPLETED_ORDERS_LOADMORE_SUCCESS:
    'GET_LIST_COMPLETED_ORDERS_LOADMORE_SUCCESS',
  GET_LIST_COMPLETED_ORDERS_LOADMORE_FAILED:
    'GET_LIST_COMPLETED_ORDERS_LOADMORE_FAILED',
};

export const actions = {
  //List user orders
  setListCompletedOrdersLoading: createAction(
    types.SET_LIST_COMPLETED_ORDERS_LOADING,
  ),
  setListCompletedOrdersLoadmoreLoading: createAction(
    types.SET_LIST_COMPLETED_ORDERS_LOADMORE_LOADING,
  ),

  getListCompletedOrders: createAction(types.GET_LIST_COMPLETED_ORDERS),
  getListCompletedOrdersSuccess: createAction(
    types.GET_LIST_COMPLETED_ORDERS_SUCCESS,
  ),
  getListCompletedOrdersFailed: createAction(
    types.GET_LIST_COMPLETED_ORDERS_FAILED,
  ),

  getListCompletedOrdersLoadmore: createAction(
    types.GET_LIST_COMPLETED_ORDERS_LOADMORE,
  ),
  getListCompletedOrdersLoadmoreSuccess: createAction(
    types.GET_LIST_COMPLETED_ORDERS_LOADMORE_SUCCESS,
  ),
  getListCompletedOrdersLoadmoreFailed: createAction(
    types.GET_LIST_COMPLETED_ORDERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List user orders
  listCompletedOrdersLoading: false,
  listCompletedOrdersLoadmoreLoading: false,
  listCompletedOrders: null,
  listCompletedOrdersCurrentPage: 0,
  hasListCompletedOrdersLoadmore: false,
};

export const handleActions = {
  //List user orders

  [types.SET_LIST_COMPLETED_ORDERS_LOADING]: (state, {payload}) => {
    return {...state, listCompletedOrdersLoading: payload};
  },
  [types.SET_LIST_COMPLETED_ORDERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listCompletedOrdersLoadmoreLoading: payload};
  },
  [types.GET_LIST_COMPLETED_ORDERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listCompletedOrders: payload,
      listCompletedOrdersCurrentPage: PAGE_INIT,
      hasListCompletedOrdersLoadmore:
        state.listCompletedOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_COMPLETED_ORDERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_COMPLETED_ORDERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listCompletedOrders?.content.concat(content) || [];
    return {
      ...state,
      listCompletedOrders: payload,
      listCompletedOrdersCurrentPage:
        state.listCompletedOrdersCurrentPage + UNIT_INCREASE,
      hasListCompletedOrdersLoadmore:
        state.listCompletedOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_COMPLETED_ORDERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
