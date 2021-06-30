import {createAction} from 'redux-actions';

export const types = {
  //List product from sale
  SET_LIST_PRODUCT_LIKED_LOADING: 'SET_LIST_PRODUCT_LIKED_LOADING',
  SET_LIST_PRODUCT_SAVED_LOADING: 'SET_LIST_PRODUCT_SAVED_LOADING',

  SET_LIST_PRODUCT_LIKED_LOADMORE_LOADING:
    'SET_LIST_PRODUCT_LIKED_LOADMORE_LOADING',
  SET_LIST_PRODUCT_SAVED_LOADMORE_LOADING:
    'SET_LIST_PRODUCT_SAVED_LOADMORE_LOADING',

  GET_LIST_PRODUCT_LIKED: 'GET_LIST_PRODUCT_LIKED',
  GET_LIST_PRODUCT_SAVED: 'GET_LIST_PRODUCT_SAVED',

  GET_LIST_PRODUCT_LIKED_LOADMORE: 'GET_LIST_PRODUCT_LIKED_LOADMORE',
  GET_LIST_PRODUCT_SAVED_LOADMORE: 'GET_LIST_PRODUCT_SAVED_LOADMORE',

  GET_LIST_PRODUCT_LIKED_SUCCESS: 'GET_LIST_PRODUCT_LIKED_SUCCESS',
  GET_LIST_PRODUCT_SAVED_SUCCESS: 'GET_LIST_PRODUCT_SAVED_SUCCESS',

  GET_LIST_PRODUCT_LIKED_LOADMORE_SUCCESS:
    'GET_LIST_PRODUCT_LIKED_LOADMORE_SUCCESS',
  GET_LIST_PRODUCT_SAVED_LOADMORE_SUCCESS:
    'GET_LIST_PRODUCT_SAVED_LOADMORE_SUCCESS',

  GET_LIST_PRODUCT_LIKED_FAILED: 'GET_LIST_PRODUCT_LIKED_FAILED',
  GET_LIST_PRODUCT_SAVED_FAILED: 'GET_LIST_PRODUCT_SAVED_FAILED',

  GET_LIST_PRODUCT_LIKED_LOADMORE_FAILED:
    'GET_LIST_PRODUCT_LIKED_LOADMORE_FAILED',
  GET_LIST_PRODUCT_SAVED_LOADMORE_FAILED:
    'GET_LIST_PRODUCT_SAVED_LOADMORE_FAILED',
};

export const actions = {
  //set loading
  setListProductLikedLoading: createAction(
    types.SET_LIST_PRODUCT_LIKED_LOADING,
  ),
  setListProductSavedLoading: createAction(
    types.SET_LIST_PRODUCT_SAVED_LOADING,
  ),

  //Set loadmore
  setListProductLikedLoadmoreLoading: createAction(
    types.SET_LIST_PRODUCT_LIKED_LOADMORE_LOADING,
  ),
  setListProductSavedLoadmoreLoading: createAction(
    types.SET_LIST_PRODUCT_SAVED_LOADMORE_LOADING,
  ),

  //GET
  getListProductLiked: createAction(types.GET_LIST_PRODUCT_LIKED),
  getListProductSaved: createAction(types.GET_LIST_PRODUCT_SAVED),

  getListProductLikedSuccess: createAction(
    types.GET_LIST_PRODUCT_LIKED_SUCCESS,
  ),
  getListProductSavedSuccess: createAction(
    types.GET_LIST_PRODUCT_SAVED_SUCCESS,
  ),

  getListProductLikedFailed: createAction(types.GET_LIST_PRODUCT_LIKED_FAILED),
  getListProductSavedFailed: createAction(types.GET_LIST_PRODUCT_SAVED_FAILED),

  //Loadmore
  getListProductLikedLoadmore: createAction(
    types.GET_LIST_PRODUCT_LIKED_LOADMORE,
  ),
  getListProductSavedLoadmore: createAction(
    types.GET_LIST_PRODUCT_SAVED_LOADMORE,
  ),

  getListProductLikedLoadmoreSuccess: createAction(
    types.GET_LIST_PRODUCT_LIKED_LOADMORE_SUCCESS,
  ),
  getListProductSavedLoadmoreSuccess: createAction(
    types.GET_LIST_PRODUCT_SAVED_LOADMORE_SUCCESS,
  ),

  getListProductLikedLoadmoreFailed: createAction(
    types.GET_LIST_PRODUCT_LIKED_LOADMORE_FAILED,
  ),
  getListProductSavedLoadmoreFailed: createAction(
    types.GET_LIST_PRODUCT_SAVED_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const defaultState = {
  //List liked product
  listLikedProductLoading: false,
  listLikedProductLoadmoreLoading: false,
  listLikedProduct: null,
  listLikedProductCurrentPage: 0,
  hasListLikedProductLoadmore: false,
  //SAVED
  listSavedProductLoading: false,
  listSavedProductLoadmoreLoading: false,
  listSavedProduct: null,
  listSavedProductCurrentPage: 0,
  hasListSavedProductLoadmore: false,
};

export const handleActions = {
  //LIKED
  [types.SET_LIST_PRODUCT_LIKED_LOADING]: (state, {payload}) => {
    return {...state, listLikedProductLoading: payload};
  },
  [types.SET_LIST_PRODUCT_LIKED_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listLikedProductLoadmoreLoading: payload};
  },
  [types.GET_LIST_PRODUCT_LIKED_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listLikedProduct: payload,
      listLikedProductCurrentPage: PAGE_INIT,
      hasListLikedProductLoadmore:
        state.listUserPostCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_PRODUCT_LIKED_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_PRODUCT_LIKED_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listLikedProduct?.content.concat(content) || [];
    return {
      ...state,
      listLikedProduct: payload,
      listLikedProductCurrentPage:
        state.listLikedProductCurrentPage + UNIT_INCREASE,
      hasListLikedProductLoadmore:
        state.listLikedProductCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_PRODUCT_LIKED_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
  //SAVED
  [types.SET_LIST_PRODUCT_SAVED_LOADING]: (state, {payload}) => {
    return {...state, listSavedProductLoading: payload};
  },
  [types.SET_LIST_PRODUCT_SAVED_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, listSavedProductLoadmoreLoading: payload};
  },
  [types.GET_LIST_PRODUCT_SAVED_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      listSavedProduct: payload,
      listSavedProductCurrentPage: PAGE_INIT,
      hasListSavedProductLoadmore:
        state.listUserPostCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_PRODUCT_SAVED_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_LIST_PRODUCT_SAVED_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.listSavedProduct?.content.concat(content) || [];
    return {
      ...state,
      listSavedProduct: payload,
      listSavedProductCurrentPage:
        state.listSavedProductCurrentPage + UNIT_INCREASE,
      hasListSavedProductLoadmore:
        state.listSavedProductCurrentPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_LIST_PRODUCT_SAVED_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
