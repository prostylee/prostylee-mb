import {createAction} from 'redux-actions';

export const types = {
  //List PRODUCT_FILTER
  SET_PRODUCTS_FILTER_LOADING: 'SET_PRODUCTS_FILTER_LOADING',
  GET_PRODUCTS_FILTER: 'GET_PRODUCTS_FILTER',
  GET_PRODUCTS_FILTER_SUCCESS: 'GET_PRODUCTS_FILTER_SUCCESS',
  GET_PRODUCTS_FILTER_FAILED: 'GET_PRODUCTS_FILTER_FAILED',
  SET_PRODUCTS_FILTER_STATE: 'SET_PRODUCTS_FILTER_STATE',
  CLEAR_PRODUCTS_FILTER_STATE: 'CLEAR_PRODUCTS_FILTER_STATE',
};

export const actions = {
  //List FEATURED_PRODUCT_SEARCH
  setProductsFilterLoading: createAction(types.SET_PRODUCTS_FILTER_LOADING),
  getProductsFilter: createAction(types.GET_PRODUCTS_FILTER),
  getProductsFilterSuccess: createAction(types.GET_PRODUCTS_FILTER_SUCCESS),
  getProductsFilterFailed: createAction(types.GET_PRODUCTS_FILTER_FAILED),
  setProductFilterState: createAction(types.SET_PRODUCTS_FILTER_STATE),
  clearProductsFilterState: createAction(types.CLEAR_PRODUCTS_FILTER_STATE),
};

export const defaultState = {
  //List STORE_SEARCH
  productsFilterLoading: false,
  productFilterList: [],
  pageProductFilter: 0,
  limitProductFilter: 12,
  getProductsFilterStatus: false,
  productFilterState: {},
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List PRODUCT_SEARCH
  [types.SET_PRODUCTS_FILTER_LOADING]: (state, {payload}) => {
    return {...state, productsFilterLoading: payload};
  },
  [types.GET_PRODUCTS_FILTER_FAILED]: (state, {payload}) => {
    return {
      ...state,
      getProductsFilterStatus: false,
    };
  },
  [types.GET_PRODUCTS_FILTER_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      productFilterList: [...payload],
      getProductsFilterStatus: true,
    };
  },
  [types.SET_PRODUCTS_FILTER_STATE]: (state, {payload}) => {
    console.log('FILTER PAYLOAD', payload);
    return {
      ...state,
      productFilterState: {...payload},
    };
  },
  [types.CLEAR_PRODUCTS_FILTER_STATE]: (state, {payload}) => {
    return {
      ...state,
      productFilterState: {
        attributes: {},
        category: -1,
        price: [0, 0],
      },
    };
  },
};
