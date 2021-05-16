import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LEFT_LOADING: 'SET_LEFT_LOADING',
  SET_CATEGORIES_PARENT_SELECT: 'SET_CATEGORIES_PARENT_SELECT',
  GET_LIST_LEFT_CATEGORIES: 'GET_LIST_LEFT_CATEGORIES',
  GET_LIST_LEFT_CATEGORIES_SUCCESS: 'GET_LIST_LEFT_CATEGORIES_SUCCESS',
  GET_LIST_LEFT_CATEGORIES_FAILED: 'GET_LIST_LEFT_CATEGORIES_FAILED',
  SET_PAGE_LEFT_CATEGORIES_DEFAULT: 'SET_PAGE_LEFT_CATEGORIES_DEFAULT',
  SET_LOADING_LOAD_MORE_LEFT_CATEGORIES:
    'SET_LOADING_LOAD_MORE_LEFT_CATEGORIES',
  GET_LIST_LEFT_CATEGORIES_LOAD_MORE: 'GET_LIST_LEFT_CATEGORIES_LOAD_MORE',
  GET_LIST_LEFT_CATEGORIES_LOAD_MORE_SUCCESS:
    'GET_LIST_LEFT_CATEGORIES_LOAD_MORE_SUCCESS',
  GET_LIST_LEFT_CATEGORIES_LOAD_MORE_FAILED:
    'GET_LIST_LEFT_CATEGORIES_LOAD_MORE_FAILED',
};

export const actions = {
  setLeftLoading: createAction(types.SET_LEFT_LOADING),
  getListLeftCategories: createAction(types.GET_LIST_LEFT_CATEGORIES),
  getListLeftCategoriesSuccess: createAction(
    types.GET_LIST_LEFT_CATEGORIES_SUCCESS,
  ),
  getListLeftCategoriesFailed: createAction(
    types.GET_LIST_LEFT_CATEGORIES_FAILED,
  ),
  setPageLeftCategoriesDefault: createAction(
    types.SET_PAGE_LEFT_CATEGORIES_DEFAULT,
  ),

  setLoadingLoadMoreLeftCategories: createAction(
    types.SET_LOADING_LOAD_MORE_LEFT_CATEGORIES,
  ),
  getListLeftCategoriesLoadMore: createAction(
    types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE,
  ),
  getListLeftCategoriesLoadMoreSuccess: createAction(
    types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE_SUCCESS,
  ),
  getListLeftCategoriesLoadMoreFailed: createAction(
    types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE_FAILED,
  ),
};

const intialState = {
  leftLoading: true,
    loadLeftCategoriesMoreLoading: true,
  categoriesParentSelect: null,
  listLeftCategories: {},
  hasLoadMoreLeftCategories: false,
  pageLeftCategories: 0,
  limitLeftCategories: 12,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    [types.SET_LEFT_LOADING]: (state, {payload}) => {
      return {...state, leftLoading: payload};
    },
    [types.SET_CATEGORIES_PARENT_SELECT]: (state, {payload}) => {
      return {...state, categoriesParentSelect: payload};
    },
    [types.GET_LIST_LEFT_CATEGORIES_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pageLeftCategories: PAGE_INIT,
        hasLoadMoreLeftCategories:
          state.pageLeftCategories < totalPages ? true : false,
        listLeftCategories: payload,
      };
    },
    [types.GET_LIST_LEFT_CATEGORIES_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listLeftCategories: {},
        hasLoadMoreLeftCategories: false,
      };
    },
    [types.SET_PAGE_LEFT_CATEGORIES_DEFAULT]: (state, {payload}) => {
      return {...state, pageLeftCategories: 0};
    },
    [types.SET_LOADING_LOAD_MORE_LEFT_CATEGORIES]: (state, {payload}) => {
      return {...state, loadLeftCategoriesMoreLoading: payload};
    },
    [types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listLeftCategories?.content.concat(content) || [];
      return {
        ...state,
        listLeftCategories: payload,
        page: state.page + UNIT_INCREASE,
        hasLoadMoreLeftCategories: state.page + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
  },
  intialState,
);
