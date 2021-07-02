import {createAction} from 'redux-actions';

export const types = {
  //List user orders
  SET_LIST_ON_DELIVERY_ORDERS_LOADING: 'SET_LIST_ON_DELIVERY_ORDERS_LOADING',
  SET_LIST_ON_DELIVERY_ORDERS_LOADMORE_LOADING:
    'SET_LIST_ON_DELIVERY_ORDERS_LOADMORE_LOADING',

  GET_LIST_ON_DELIVERY_ORDERS: 'GET_LIST_ON_DELIVERY_ORDERS',
  GET_LIST_ON_DELIVERY_ORDERS_SUCCESS: 'GET_LIST_ON_DELIVERY_ORDERS_SUCCESS',
  GET_LIST_ON_DELIVERY_ORDERS_FAILED: 'GET_LIST_ON_DELIVERY_ORDERS_FAILED',

  GET_LIST_ON_DELIVERY_ORDERS_LOADMORE: 'GET_LIST_ON_DELIVERY_ORDERS_LOADMORE',
  GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_SUCCESS:
    'GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_SUCCESS',
  GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_FAILED:
    'GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_FAILED',
};

export const actions = {
  //List user orders
  setListOnDeliveryOrdersLoading: createAction(
    types.SET_LIST_ON_DELIVERY_ORDERS_LOADING,
  ),
  setListOnDeliveryOrdersLoadmoreLoading: createAction(
    types.SET_LIST_ON_DELIVERY_ORDERS_LOADMORE_LOADING,
  ),

  getListOnDeliveryOrders: createAction(types.GET_LIST_ON_DELIVERY_ORDERS),
  getListOnDeliveryOrdersSuccess: createAction(
    types.GET_LIST_ON_DELIVERY_ORDERS_SUCCESS,
  ),
  getListOnDeliveryOrdersFailed: createAction(
    types.GET_LIST_ON_DELIVERY_ORDERS_FAILED,
  ),

  getListOnDeliveryOrdersLoadmore: createAction(
    types.GET_LIST_ON_DELIVERY_ORDERS_LOADMORE,
  ),
  getListOnDeliveryOrdersLoadmoreSuccess: createAction(
    types.GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_SUCCESS,
  ),
  getListOnDeliveryOrdersLoadmoreFailed: createAction(
    types.GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List user orders
  listOnDeliveryOrdersLoading: false,
  listOnDeliveryOrdersLoadmoreLoading: false,
  listOnDeliveryOrders: null,
  listOnDeliveryOrdersCurrentPage: 0,
  hasListOnDeliveryOrdersLoadmore: false,
};

export const handleActions = {
  //List user orders

  [types.SET_LIST_ON_DELIVERY_ORDERS_LOADING]: (state, {payload}) => {
    return {...state, listOnDeliveryOrdersLoading: payload};
  },
  [types.SET_LIST_ON_DELIVERY_ORDERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listOnDeliveryOrdersLoadmoreLoading: payload};
  },
  [types.GET_LIST_ON_DELIVERY_ORDERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listOnDeliveryOrders: payload,
      listOnDeliveryOrdersCurrentPage: PAGE_INIT,
      hasListOnDeliveryOrdersLoadmore:
        state.listOnDeliveryOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_ON_DELIVERY_ORDERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listOnDeliveryOrders?.content.concat(content) || [];
    return {
      ...state,
      listOnDeliveryOrders: payload,
      listOnDeliveryOrdersCurrentPage:
        state.listOnDeliveryOrdersCurrentPage + UNIT_INCREASE,
      hasListOnDeliveryOrdersLoadmore:
        state.listOnDeliveryOrdersCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_ON_DELIVERY_ORDERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
