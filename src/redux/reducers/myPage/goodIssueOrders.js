import {createAction} from 'redux-actions';

export const types = {
  //List user orders
  SET_LIST_GOOD_ISSUES_ORDERS_LOADING: 'SET_LIST_GOOD_ISSUES_ORDERS_LOADING',
  SET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_LOADING:
    'SET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_LOADING',

  GET_LIST_GOOD_ISSUES_ORDERS: 'GET_LIST_GOOD_ISSUES_ORDERS',
  GET_LIST_GOOD_ISSUES_ORDERS_SUCCESS: 'GET_LIST_GOOD_ISSUES_ORDERS_SUCCESS',
  GET_LIST_GOOD_ISSUES_ORDERS_FAILED: 'GET_LIST_GOOD_ISSUES_ORDERS_FAILED',

  GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE: 'GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE',
  GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_SUCCESS:
    'GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_SUCCESS',
  GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_FAILED:
    'GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_FAILED',
};

export const actions = {
  //List user orders
  setListGoodIssuesOrdersLoading: createAction(
    types.SET_LIST_GOOD_ISSUES_ORDERS_LOADING,
  ),
  setListGoodIssuesOrdersLoadmoreLoading: createAction(
    types.SET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_LOADING,
  ),

  getListGoodIssuesOrders: createAction(types.GET_LIST_GOOD_ISSUES_ORDERS),
  getListGoodIssuesOrdersSuccess: createAction(
    types.GET_LIST_GOOD_ISSUES_ORDERS_SUCCESS,
  ),
  getListGoodIssuesOrdersFailed: createAction(
    types.GET_LIST_GOOD_ISSUES_ORDERS_FAILED,
  ),

  getListGoodIssuesOrdersLoadmore: createAction(
    types.GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE,
  ),
  getListGoodIssuesOrdersLoadmoreSuccess: createAction(
    types.GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_SUCCESS,
  ),
  getListGoodIssuesOrdersLoadmoreFailed: createAction(
    types.GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List user orders
  listGoodIssuesOrdersLoading: false,
  listGoodIssuesOrdersLoadmoreLoading: false,
  listGoodIssuesOrders: null,
  listGoodIssuesOrdersCurrentPage: 0,
  hasListGoodIssuesOrdersLoadmore: false,
};

export const handleActions = {
  //List user orders

  [types.SET_LIST_GOOD_ISSUES_ORDERS_LOADING]: (state, {payload}) => {
    return {...state, listGoodIssuesOrdersLoading: payload};
  },
  [types.SET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listGoodIssuesOrdersLoadmoreLoading: payload};
  },
  [types.GET_LIST_GOOD_ISSUES_ORDERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listGoodIssuesOrders: payload,
      listGoodIssuesOrdersCurrentPage: PAGE_INIT,
      hasListGoodIssuesOrdersLoadmore:
        state.listGoodIssuesOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_GOOD_ISSUES_ORDERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listGoodIssuesOrders?.content.concat(content) || [];
    return {
      ...state,
      listGoodIssuesOrders: payload,
      listGoodIssuesOrdersCurrentPage:
        state.listGoodIssuesOrdersCurrentPage + UNIT_INCREASE,
      hasListGoodIssuesOrdersLoadmore:
        state.listGoodIssuesOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_GOOD_ISSUES_ORDERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
