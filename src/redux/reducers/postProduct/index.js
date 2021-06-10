import {createAction, handleActions} from 'redux-actions';

export const types = {
  //Category

  GET_CATEGORY: 'GET_CATEGORY',
  GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
  GET_CATEGORY_FAIL: 'GET_CATEGORY_FAIL',
  SET_CATEGORY_LOADING: 'SET_CATEGORY_LOADING',
  SET_PAGE_CATEGORY_DEFAULT: 'SET_PAGE_CATEGORY_DEFAULT',
  GET_MORE_CATEGORY: 'GET_MORE_CATEGORY',
  GET_MORE_CATEGORY_SUCCESS: 'GET_MORE_CATEGORY_SUCCESS',
  GET_MORE_CATEGORY_FAIL: 'GET_MORE_CATEGORY_FAIL',
  SET_CATEGORY_LOADING_LOAD_MORE: 'SET_CATEGORY_LOADING_LOAD_MORE',

  //Brand -> STORE MAIN ALREADY EXIST
  SET_PRODUCT_INFO: 'SET_PRODUCT_INFO',
  CLEAR_PRODUCT_INFO: 'CLEAR_PRODUCT_INFO',

  SET_PRODUCT_CATEGORY: 'SET_PRODUCT_CATEGORY',
  SET_PRODUCT_IMAGES: 'SET_PRODUCT_IMAGES',
  SET_PRODUCT_NAME: 'SET_PRODUCT_NAME',
  SET_PRODUCT_DESCRIPTION: 'SET_PRODUCT_DESCRIPTION',
  SET_PRODUCT_BRAND: 'SET_PRODUCT_BRAND',
  SET_PRODUCT_STATUS: 'SET_PRODUCT_STATUS',
  SET_PRODUCT_SIZES: 'SET_PRODUCT_SIZES',
  SET_PRODUCT_COLORS: 'SET_PRODUCT_COLORS',
  SET_PRODUCT_PRICE: 'SET_PRODUCT_PRICE',
  SET_PRODUCT_ADDRESS: 'SET_PRODUCT_ADDRESS',
  SET_PRODUCT_LAT: 'SET_PRODUCT_LAT',
  SET_PRODUCT_LON: 'SET_PRODUCT_LON',
  SET_PRODUCT_PAYMENT_METHOD: 'SET_PRODUCT_PAYMENT_METHOD',
  SET_PRODUCT_DELIVERY_TYPE: 'SET_PRODUCT_DELIVERY_TYPE',
};

export const actions = {
  getCategory: createAction(types.GET_CATEGORY),
  getCategorySuccess: createAction(types.GET_CATEGORY_SUCCESS),
  getCategoryFail: createAction(types.GET_CATEGORY_FAIL),
  setCategoryLoading: createAction(types.SET_CATEGORY_LOADING),
  getMoreCategory: createAction(types.GET_MORE_CATEGORY),
  getMoreCategorySuccess: createAction(types.GET_MORE_CATEGORY_SUCCESS),
  getMoreCategoryFail: createAction(types.GET_MORE_CATEGORY_FAIL),
  setCategoryMoreLoading: createAction(types.SET_CATEGORY_LOADING_LOAD_MORE),
  setPageCategoryDefault: createAction(types.SET_PAGE_CATEGORY_DEFAULT),
  setProductInfo: createAction(types.SET_PRODUCT_INFO),
};

export const selectors = {
  getCategory: (state) => state.postProduct.category,
};

const defaultState = {
  // List categories
  categoryLoading: false,
  categoryLoadMoreLoading: false,
  category: null,
  hasMoreCategory: false,
  pageCategory: 0,
  limitCategory: 10,
  // POST PRODUCT INFO

  //phase1
  category: null,
  childrenCategory: null,
  //phase2
  images: null,
  productName: '',
  description: '',
  brand: null,
  //phase3
  status: null,
  sizes: null,
  colors: null,
  price: 0,
  //phase4
  address: '',
  latitude: 0,
  longtitude: 0,
  paymentMethod: null,
  deliveryType: null,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List product from categories
    [types.SET_CATEGORY_LOADING]: (state, {payload}) => {
      return {...state, categoryLoading: payload};
    },
    [types.GET_CATEGORY_SUCCESS]: (state, {payload}) => {
      // const {totalPages} = payload;
      return {
        ...state,
        pageCategory: PAGE_INIT,
        // hasLoadMoreProduct: state.pageProduct + 1 < totalPages ? true : false,
        category: payload,
      };
    },
    [types.GET_CATEGORY_FAIL]: (state, {payload}) => {
      return state;
    },
    [types.SET_PAGE_CATEGORY_DEFAULT]: (state, {payload}) => {
      return {...state, pageCategory: 0};
    },
    [types.SET_CATEGORY_LOADING_LOAD_MORE]: (state, {payload}) => {
      return {...state, categoryLoadMoreLoading: payload};
    },
    [types.GET_LIST_PRODUCT_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      // const {totalPages, content} = payload;
      // payload.content = state.listProduct?.content.concat(content) || [];
      return {
        ...state,
        category: payload,
        pageProduct: state.pageProduct + UNIT_INCREASE,
        // hasLoadMoreProduct:
        //   state.pageProduct + UNIT_INCREASE + 1 < totalPages ? true : false,
      };
    },
    [types.GET_MORE_CATEGORY_FAIL]: (state, {payload}) => {
      return state;
    },
    [types.SET_PRODUCT_INFO]: (state, {payload}) => {
      return {
        ...state,
        ...payload,
      };
    },
    [types.CLEAR_PRODUCT_INFO]: (state) => {
      return defaultState;
    },
  },
  defaultState,
);
