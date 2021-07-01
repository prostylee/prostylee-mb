import {createAction} from 'redux-actions';

export const types = {
  //List user orders
  SET_LIST_CREATED_ORDERS_LOADING: 'SET_LIST_CREATED_ORDERS_LOADING',
  SET_LIST_CREATED_ORDERS_LOADMORE_LOADING:
    'SET_LIST_CREATED_ORDERS_LOADMORE_LOADING',

  GET_LIST_CREATED_ORDERS: 'GET_LIST_CREATED_ORDERS',
  GET_LIST_CREATED_ORDERS_SUCCESS: 'GET_LIST_CREATED_ORDERS_SUCCESS',
  GET_LIST_CREATED_ORDERS_FAILED: 'GET_LIST_CREATED_ORDERS_FAILED',

  GET_LIST_CREATED_ORDERS_LOADMORE: 'GET_LIST_CREATED_ORDERS_LOADMORE',
  GET_LIST_CREATED_ORDERS_LOADMORE_SUCCESS:
    'GET_LIST_CREATED_ORDERS_LOADMORE_SUCCESS',
  GET_LIST_CREATED_ORDERS_LOADMORE_FAILED:
    'GET_LIST_CREATED_ORDERS_LOADMORE_FAILED',
};

export const actions = {
  //List user orders
  setListCreatedOrdersLoading: createAction(
    types.SET_LIST_CREATED_ORDERS_LOADING,
  ),
  setListCreatedOrdersLoadmoreLoading: createAction(
    types.SET_LIST_CREATED_ORDERS_LOADMORE_LOADING,
  ),

  getListCreatedOrders: createAction(types.GET_LIST_CREATED_ORDERS),
  getListCreatedOrdersSuccess: createAction(
    types.GET_LIST_CREATED_ORDERS_SUCCESS,
  ),
  getListCreatedOrdersFailed: createAction(
    types.GET_LIST_CREATED_ORDERS_FAILED,
  ),

  getListCreatedOrdersLoadmore: createAction(
    types.GET_LIST_CREATED_ORDERS_LOADMORE,
  ),
  getListCreatedOrdersLoadmoreSuccess: createAction(
    types.GET_LIST_CREATED_ORDERS_LOADMORE_SUCCESS,
  ),
  getListCreatedOrdersLoadmoreFailed: createAction(
    types.GET_LIST_CREATED_ORDERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List user orders
  listCreatedOrdersLoading: false,
  listCreatedOrdersLoadmoreLoading: false,
  listCreatedOrders: null,
  listCreatedOrdersCurrentPage: 0,
  hasListCreatedOrdersLoadmore: false,
};

export const handleActions = {
  //List user orders

  [types.SET_LIST_CREATED_ORDERS_LOADING]: (state, {payload}) => {
    return {...state, listCreatedOrdersLoading: payload};
  },
  [types.SET_LIST_CREATED_ORDERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listCreatedOrdersLoadmoreLoading: payload};
  },
  [types.GET_LIST_CREATED_ORDERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listCreatedOrders: payload,
      listCreatedOrdersCurrentPage: PAGE_INIT,
      hasListCreatedOrdersLoadmore:
        state.listCreatedOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_CREATED_ORDERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_CREATED_ORDERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listCreatedOrders?.content.concat(content) || [];
    return {
      ...state,
      listCreatedOrders: payload,
      listCreatedOrdersCurrentPage:
        state.listCreatedOrdersCurrentPage + UNIT_INCREASE,
      hasListCreatedOrdersLoadmore:
        state.listCreatedOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_CREATED_ORDERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
