import {createAction, handleActions} from 'redux-actions';
import {
  types as typesTopSearch,
  actions as actionsTopSearch,
  defaultState as defaultStateTopSearch,
  handleActions as handleActionsTopSearch,
} from './topSearch';

export const types = {
  //List TOP_SEARCH
  ...typesTopSearch,
  //List SEARCH_FEATURED_CATEGORIES
  SET_SEARCH_FEATURED_CATEGORIES_LOADING:
    'SET_SEARCH_FEATURED_CATEGORIES_LOADING',
  GET_SEARCH_FEATURED_CATEGORIES: 'GET_SEARCH_FEATURED_CATEGORIES',
  GET_SEARCH_FEATURED_CATEGORIES_SUCCESS:
    'GET_SEARCH_FEATURED_CATEGORIES_SUCCESS',
  GET_SEARCH_FEATURED_CATEGORIES_FAILED:
    'GET_SEARCH_FEATURED_CATEGORIES_FAILED',
  SET_PAGE_SEARCH_FEATURED_CATEGORIES_DEFAULT:
    'SET_PAGE_SEARCH_FEATURED_CATEGORIES_DEFAULT',
  SET_SEARCH_FEATURED_CATEGORIES_LOADING_LOAD_MORE:
    'SET_SEARCH_FEATURED_CATEGORIES_LOADING_LOAD_MORE',
  GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE:
    'GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE',
  GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_SUCCESS:
    'GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_SUCCESS',
  GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_FAILED:
    'GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_FAILED',
};

export const actions = {
  //List TOP_SEARCH
  ...actionsTopSearch,
  //List SEARCH_FEATURED_CATEGORIES
  setSearchFeaturedCategoriesLoading: createAction(
    types.SET_SEARCH_FEATURED_CATEGORIES_LOADING,
  ),
  getSearchFeaturedCategories: createAction(
    types.GET_SEARCH_FEATURED_CATEGORIES,
  ),
  getSearchFeaturedCategoriesSuccess: createAction(
    types.GET_SEARCH_FEATURED_CATEGORIES_SUCCESS,
  ),
  getSearchFeaturedCategoriesFailed: createAction(
    types.GET_SEARCH_FEATURED_CATEGORIES_FAILED,
  ),
  setPageSearchFeaturedCategoriesDefault: createAction(
    types.SET_PAGE_SEARCH_FEATURED_CATEGORIES_DEFAULT,
  ),

  setSearchFeaturedCategoriesLoadingLoadMore: createAction(
    types.SET_SEARCH_FEATURED_CATEGORIES_LOADING_LOAD_MORE,
  ),
  getSearchFeaturedCategoriesLoadMore: createAction(
    types.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE,
  ),
  getSearchFeaturedCategoriesLoadMoreSuccess: createAction(
    types.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_SUCCESS,
  ),
  getSearchFeaturedCategoriesLoadMoreFailed: createAction(
    types.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_FAILED,
  ),
};

const defaultState = {
  //List TOP_SEARCH
  ...defaultStateTopSearch,
  //List SEARCH_FEATURED_CATEGORIES
  searchFeaturedCategoriesLoading: false,
  loadSearchFeaturedCategoriesMoreLoading: false,
  searchFeaturedCategories: {},
  hasLoadMoreSearchFeaturedCategories: false,
  pageSearchFeaturedCategories: 0,
  limitSearchFeaturedCategories: 12,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export default handleActions(
  {
    //List TOP_SEARCH
    ...handleActionsTopSearch,
    //List SearchFeaturedCategories from categories
    [types.SET_SEARCH_FEATURED_CATEGORIES_LOADING]: (state, {payload}) => {
      return {...state, searchFeaturedCategoriesLoading: payload};
    },
    [types.GET_SEARCH_FEATURED_CATEGORIES_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pageSearchFeaturedCategoriesCategories: PAGE_INIT,
        hasLoadMoreSearchFeaturedCategories:
          state.pageSearchFeaturedCategories + 1 < totalPages ? true : false,
        searchFeaturedCategories: payload,
      };
    },
    [types.GET_SEARCH_FEATURED_CATEGORIES_FAILED]: (state, {payload}) => {
      return {
        ...state,
        searchFeaturedCategories: {},
        hasLoadMoreSearchFeaturedCategories: false,
      };
    },
    [types.SET_PAGE_SEARCH_FEATURED_CATEGORIES_DEFAULT]: (state, {payload}) => {
      return {...state, pageSearchFeaturedCategories: 0};
    },
    [types.SET_SEARCH_FEATURED_CATEGORIES_LOADING_LOAD_MORE]: (
      state,
      {payload},
    ) => {
      return {...state, loadSearchFeaturedCategoriesMoreLoading: payload};
    },
    [types.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_SUCCESS]: (
      state,
      {payload},
    ) => {
      const {totalPages, content} = payload;
      payload.content =
        state.searchFeaturedCategories?.content.concat(content) || [];
      return {
        ...state,
        searchFeaturedCategories: payload,
        pageSearchFeaturedCategories:
          state.pageSearchFeaturedCategories + UNIT_INCREASE,
        hasLoadMoreSearchFeaturedCategories:
          state.pageSearchFeaturedCategories + UNIT_INCREASE + 1 < totalPages
            ? true
            : false,
      };
    },
    [types.GET_SEARCH_FEATURED_CATEGORIES_LOAD_MORE_FAILED]: (
      state,
      {payload},
    ) => {
      return {...state};
    },
  },
  defaultState,
);
