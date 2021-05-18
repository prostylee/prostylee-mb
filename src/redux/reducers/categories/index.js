import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_CATEGORIES_PARENT_SELECT: 'SET_CATEGORIES_PARENT_SELECT',
  SET_CATEGORIES_SELECT: 'SET_CATEGORIES_SELECT',
  //Left categories
  SET_LEFT_LOADING: 'SET_LEFT_LOADING',
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

  //Right categories
  SET_RIGHT_LOADING: 'SET_RIGHT_LOADING',
  GET_LIST_RIGHT_CATEGORIES: 'GET_LIST_RIGHT_CATEGORIES',
  GET_LIST_RIGHT_CATEGORIES_SUCCESS: 'GET_LIST_RIGHT_CATEGORIES_SUCCESS',
  GET_LIST_RIGHT_CATEGORIES_FAILED: 'GET_LIST_RIGHT_CATEGORIES_FAILED',
  SET_PAGE_RIGHT_CATEGORIES_DEFAULT: 'SET_PAGE_RIGHT_CATEGORIES_DEFAULT',
  SET_LOADING_LOAD_MORE_RIGHT_CATEGORIES:
    'SET_LOADING_LOAD_MORE_RIGHT_CATEGORIES',
  GET_LIST_RIGHT_CATEGORIES_LOAD_MORE: 'GET_LIST_RIGHT_CATEGORIES_LOAD_MORE',
  GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_SUCCESS:
    'GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_SUCCESS',
  GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_FAILED:
    'GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_FAILED',
};

export const actions = {
  setCategoriesParentSelect: createAction(types.SET_CATEGORIES_PARENT_SELECT),
  setCategoriesSelect: createAction(types.SET_CATEGORIES_SELECT),
  //Left
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
  //Right
  setRightLoading: createAction(types.SET_RIGHT_LOADING),
  getListRightCategories: createAction(types.GET_LIST_RIGHT_CATEGORIES),
  getListRightCategoriesSuccess: createAction(
    types.GET_LIST_RIGHT_CATEGORIES_SUCCESS,
  ),
  getListRightCategoriesFailed: createAction(
    types.GET_LIST_RIGHT_CATEGORIES_FAILED,
  ),
  setPageRightCategoriesDefault: createAction(
    types.SET_PAGE_RIGHT_CATEGORIES_DEFAULT,
  ),

  setLoadingLoadMoreRightCategories: createAction(
    types.SET_LOADING_LOAD_MORE_RIGHT_CATEGORIES,
  ),
  getListRightCategoriesLoadMore: createAction(
    types.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE,
  ),
  getListRightCategoriesLoadMoreSuccess: createAction(
    types.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_SUCCESS,
  ),
  getListRightCategoriesLoadMoreFailed: createAction(
    types.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_FAILED,
  ),
};

const intialState = {
  categoriesParentSelect: null,
  categoriesSelect: null,
  //Left
  leftLoading: false,
  loadLeftCategoriesMoreLoading: false,
  listLeftCategories: {},
  hasLoadMoreLeftCategories: false,
  pageLeftCategories: 0,
  limitLeftCategories: 12,
  //Right
  rightLoading: false,
  loadRightCategoriesMoreLoading: false,
  listRightCategories: {},
  hasLoadMoreRightCategories: false,
  pageRightCategories: 0,
  limitRightCategories: 12,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    [types.SET_CATEGORIES_PARENT_SELECT]: (state, {payload}) => {
      return {...state, categoriesParentSelect: payload};
    },
    [types.SET_CATEGORIES_SELECT]: (state, {payload}) => {
      return {...state, categoriesSelect: payload};
    },
    //Left
    [types.SET_LEFT_LOADING]: (state, {payload}) => {
      return {...state, leftLoading: payload};
    },
    [types.GET_LIST_LEFT_CATEGORIES_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pageLeftCategories: PAGE_INIT,
        hasLoadMoreLeftCategories:
          state.pageLeftCategories + 1 < totalPages ? true : false,
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
    [types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listLeftCategories?.content.concat(content) || [];
      return {
        ...state,
        listLeftCategories: payload,
        pageLeftCategories: state.pageLeftCategories + UNIT_INCREASE,
        hasLoadMoreLeftCategories:
          state.pageLeftCategories + UNIT_INCREASE + 1 < totalPages
            ? true
            : false,
      };
    },
    [types.GET_LIST_LEFT_CATEGORIES_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
    //Right
    [types.SET_RIGHT_LOADING]: (state, {payload}) => {
      return {...state, rightLoading: payload};
    },
    [types.GET_LIST_RIGHT_CATEGORIES_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pageRightCategories: PAGE_INIT,
        hasLoadMoreRightCategories:
          state.pageRightCategories + 1 < totalPages ? true : false,
        listRightCategories: payload,
      };
    },
    [types.GET_LIST_RIGHT_CATEGORIES_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listRightCategories: {},
        hasLoadMoreRightCategories: false,
      };
    },
    [types.SET_PAGE_RIGHT_CATEGORIES_DEFAULT]: (state, {payload}) => {
      return {...state, pageRightCategories: 0};
    },
    [types.SET_LOADING_LOAD_MORE_RIGHT_CATEGORIES]: (state, {payload}) => {
      return {...state, loadRightCategoriesMoreLoading: payload};
    },
    [types.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content =
        state.listRightCategories?.content.concat(content) || [];
      return {
        ...state,
        listRightCategories: payload,
        pageRightCategories: state.pageRightCategories + UNIT_INCREASE,
        hasLoadMoreRightCategories:
          state.pageRightCategories + UNIT_INCREASE + 1 < totalPages
            ? true
            : false,
      };
    },
    [types.GET_LIST_RIGHT_CATEGORIES_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
  },
  intialState,
);
