import {createAction, handleActions} from 'redux-actions';

import {
  types as typesStoreMain,
  actions as actionsStoreMain,
  defaultState as defaultStateStoreMain,
  handleActions as handleActionsStoreMain,
} from './storeMain';

import {
  types as typesNearbyStore,
  actions as actionsNearbyStore,
  defaultState as defaultStateNearbyStore,
  handleActions as handleActionsNearbyStore,
} from './nearbyStore';

import {
  types as typesPersonalSaler,
  actions as actionsPersonalSaler,
  defaultState as defaultStatePersonalSaler,
  handleActions as handleActionsPersonalSaler,
} from './personalSaler';

import {
  types as typesBestSellers,
  actions as actionsBestSellers,
  defaultState as defaultStateBestSellers,
  handleActions as handleActionsBestSellers,
} from './bestSellers';

import {
  types as typesVouchers,
  actions as actionsVouchers,
  defaultState as defaultStateVouchers,
  handleActions as handleActionsVouchers,
} from './vouchers';

import {
  types as typesFlashSale,
  actions as actionsFlashSale,
  defaultState as defaultStateFlashSale,
  handleActions as handleActionsFlashSale,
} from './flashSale';

export const types = {
  // STORE MAIN
  ...typesStoreMain,
  // NEARBY STORE
  ...typesNearbyStore,
  // PERSONAL SALERS
  ...typesPersonalSaler,
  // BEST SELLER
  ...typesBestSellers,
  //VOUCHERS
  ...typesVouchers,
  //FLASH_SALE
  ...typesFlashSale,

  SET_LOADING: 'SET_LOADING',
  GET_TOP_PRODUCT: 'GET_TOP_PRODUCT',
  GET_TOP_PRODUCT_SUCCESS: 'GET_TOP_PRODUCT_SUCCESS',
  GET_TOP_PRODUCT_FAILED: 'GET_TOP_PRODUCT_FAILED',
  SET_LOADING_FUTURED_STORE: 'SET_LOADING_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE: 'GET_LIST_OF_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE_SUCCESS: 'GET_LIST_OF_FUTURED_STORE_SUCCESS',
  GET_LIST_OF_FUTURED_STORE_FAILED: 'GET_LIST_OF_FUTURED_STORE_FAILED',
  SET_LOADING_LOAD_MORE_FUTURED_STORE: 'SET_LOADING_LOAD_MORE_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE_LOAD_MORE: 'GET_LIST_OF_FUTURED_STORE_LOAD_MORE',
  GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS:
    'GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS',
  GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED:
    'GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED',
  SET_PAGE_DEFAULT: 'SET_PAGE_DEFAULT',
};

export const actions = {
  //STORE MAIN
  ...actionsStoreMain,
  // // NEARBY STORE
  ...actionsNearbyStore,
  // // PERSONAL SALERS
  ...actionsPersonalSaler,
  // BEST SELLER
  ...actionsBestSellers,
  //VOUCHER
  ...actionsVouchers,
  //FLASH SALES
  ...actionsFlashSale,

  setLoading: createAction(types.SET_LOADING),
  setPageDefault: createAction(types.SET_PAGE_DEFAULT),
  getTopProduct: createAction(types.GET_TOP_PRODUCT),
  getTopProductSuccess: createAction(types.GET_TOP_PRODUCT_SUCCESS),
  getTopProductFailed: createAction(types.GET_TOP_PRODUCT_FAILED),
  setLoadingFuturedStores: createAction(types.SET_LOADING_FUTURED_STORE),
  getListOfFuturedStore: createAction(types.GET_LIST_OF_FUTURED_STORE),
  getListOfFuturedStoreSuccess: createAction(
    types.GET_LIST_OF_FUTURED_STORE_SUCCESS,
  ),
  getListOfFuturedStoreFailed: createAction(
    types.GET_LIST_OF_FUTURED_STORE_FAILED,
  ),
  setLoadingLoadMoreFuturedStores: createAction(
    types.SET_LOADING_LOAD_MORE_FUTURED_STORE,
  ),
  getListOfFuturedStoresLoadMore: createAction(
    types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE,
  ),
  getListOfFuturedStoresLoadMoreSuccess: createAction(
    types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS,
  ),
  getListOfFuturedStoresLoadMoreFailed: createAction(
    types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

const intialState = {
  //STORE MAIN
  ...defaultStateStoreMain,
  // NEARBY STORE
  ...defaultStateNearbyStore,
  // // PERSONAL SALERS
  ...defaultStatePersonalSaler,
  //BEST SELLER
  ...defaultStateBestSellers,
  //VOUCHERS
  ...defaultStateVouchers,
  // FLASH SALES
  ...defaultStateFlashSale,

  isLoading: false,
  isLoadingFuturedStores: false,
  isLoadMoreLoading: false,
  topProduct: {},
  listOfFuturedStores: {},
  hasLoadMore: false,
  page: 0,
  limit: 12,
};

export default handleActions(
  {
    //STORE MAIN
    ...handleActionsStoreMain,
    // NEARBY STORE
    ...handleActionsNearbyStore,
    // // PERSONAL SALERS
    ...handleActionsPersonalSaler,
    //BEST SELLER
    ...handleActionsBestSellers,
    //VOUCHERS
    ...handleActionsVouchers,
    //FLASH SALE
    ...handleActionsFlashSale,

    [types.SET_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SET_PAGE_DEFAULT]: (state, {payload}) => {
      return {...state, page: 0};
    },
    [types.GET_TOP_PRODUCT_SUCCESS]: (state, {payload}) => {
      return {...state, topProduct: payload};
    },
    [types.GET_TOP_PRODUCT_FAILED]: (state, {payload}) => {
      return {...state, topProduct: {}};
    },
    [types.SET_LOADING_FUTURED_STORE]: (state, {payload}) => {
      return {...state, isLoadingFuturedStores: payload};
    },
    [types.GET_LIST_OF_FUTURED_STORE_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        page: PAGE_INIT,
        hasLoadMore: state.page < totalPages ? true : false,
        listOfFuturedStores: payload,
      };
    },
    [types.GET_LIST_OF_FUTURED_STORE_FAILED]: (state, {payload}) => {
      return {...state, listOfFuturedStores: {}};
    },
    [types.SET_LOADING_LOAD_MORE_FUTURED_STORE]: (state, {payload}) => {
      return {...state, isLoadMoreLoading: payload};
    },
    [types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content =
        state.listOfFuturedStores?.content.concat(content) || [];
      return {
        ...state,
        listOfFuturedStores: payload,
        page: state.page + UNIT_INCREASE,
        hasLoadMore: state.page + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
  },
  intialState,
);
