import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_CATEGORY: 'GET_CATEGORY',
  GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
  GET_CATEGORY_FAIL: 'GET_CATEGORY_FAIL',
  SET_CATEGORY_LOADING: 'SET_CATEGORY_LOADING',
  SET_PAGE_CATEGORY_DEFAULT: 'SET_PAGE_CATEGORY_DEFAULT',
  GET_MORE_CATEGORY: 'GET_MORE_CATEGORY',
  GET_MORE_CATEGORY_SUCCESS: 'GET_MORE_CATEGORY_SUCCESS',
  GET_MORE_CATEGORY_FAIL: 'GET_MORE_CATEGORY_FAIL',
  SET_CATEGORY_LOADING_LOAD_MORE: 'SET_CATEGORY_LOADING_LOAD_MORE',
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
    // [types.SET_PAGE_PRODUCT_DEFAULT]: (state, {payload}) => {
    //   return {...state, pageProduct: 0};
    // },
    // [types.SET_LOADING_LOAD_MORE_PRODUCT]: (state, {payload}) => {
    //   return {...state, loadProductMoreLoading: payload};
    // },
    // [types.GET_LIST_PRODUCT_LOAD_MORE_FAILED]: (state, {payload}) => {
    //   return {...state};
    // },
  },
  defaultState,
);
