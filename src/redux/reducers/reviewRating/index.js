import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_REVIEW_RATINGS: 'GET_REVIEW_RATINGS',
  GET_REVIEW_RATINGS_SUCCESS: 'GET_REVIEW_RATINGS_SUCCESS',
  //List reviewRating from categories
  SET_LIST_REVIEW_RATING_LOADING: 'SET_LIST_REVIEW_RATING_LOADING',
  GET_LIST_REVIEW_RATING: 'GET_LIST_REVIEW_RATING',
  GET_LIST_REVIEW_RATING_SUCCESS: 'GET_LIST_REVIEW_RATING_SUCCESS',
  GET_LIST_REVIEW_RATING_FAILED: 'GET_LIST_REVIEW_RATING_FAILED',
  SET_PAGE_REVIEW_RATING_DEFAULT: 'SET_PAGE_REVIEW_RATING_DEFAULT',
  SET_LOADING_LOAD_MORE_REVIEW_RATING: 'SET_LOADING_LOAD_MORE_REVIEW_RATING',
  GET_LIST_REVIEW_RATING_LOAD_MORE: 'GET_LIST_REVIEW_RATING_LOAD_MORE',
  GET_LIST_REVIEW_RATING_LOAD_MORE_SUCCESS:
    'GET_LIST_REVIEW_RATING_LOAD_MORE_SUCCESS',
  GET_LIST_REVIEW_RATING_LOAD_MORE_FAILED:
    'GET_LIST_REVIEW_RATING_LOAD_MORE_FAILED',
};

export const actions = {
  getReviewRatings: createAction(types.GET_REVIEW_RATINGS),
  getReviewRatingsSuccess: createAction(types.GET_REVIEW_RATINGS_SUCCESS),
  //List reviewRating from categories
  setListReviewRatingLoading: createAction(
    types.SET_LIST_REVIEW_RATING_LOADING,
  ),
  getListReviewRating: createAction(types.GET_LIST_REVIEW_RATING),
  getListReviewRatingSuccess: createAction(
    types.GET_LIST_REVIEW_RATING_SUCCESS,
  ),
  getListReviewRatingFailed: createAction(types.GET_LIST_REVIEW_RATING_FAILED),
  setPageReviewRatingDefault: createAction(
    types.SET_PAGE_REVIEW_RATING_DEFAULT,
  ),

  setLoadingLoadMoreReviewRating: createAction(
    types.SET_LOADING_LOAD_MORE_REVIEW_RATING,
  ),
  getListReviewRatingLoadMore: createAction(
    types.GET_LIST_REVIEW_RATING_LOAD_MORE,
  ),
  getListReviewRatingLoadMoreSuccess: createAction(
    types.GET_LIST_REVIEW_RATING_LOAD_MORE_SUCCESS,
  ),
  getListReviewRatingLoadMoreFailed: createAction(
    types.GET_LIST_REVIEW_RATING_LOAD_MORE_FAILED,
  ),
};

export const selectors = {
  getReviewRatings: (state) => state.reviewRating.networkStatus,
};

const defaultState = {
  reviewRatings: null,
  //List reviewRating from categories
  listReviewRatingLoading: false,
  loadReviewRatingMoreLoading: false,
  listReviewRating: {},
  hasLoadMoreReviewRating: false,
  pageReviewRating: 0,
  limitReviewRating: 12,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    [types.GET_REVIEW_RATINGS_SUCCESS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    //List reviewRating from categories
    [types.SET_LIST_REVIEW_RATING_LOADING]: (state, {payload}) => {
      return {...state, listReviewRatingLoading: payload};
    },
    [types.GET_LIST_REVIEW_RATING_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pagelistReviewRatingCategories: PAGE_INIT,
        hasLoadMoreReviewRating:
          state.pageReviewRating + 1 < totalPages ? true : false,
        listReviewRating: payload,
      };
    },
    [types.GET_LIST_REVIEW_RATING_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listReviewRating: {},
        hasLoadMoreReviewRating: false,
      };
    },
    [types.SET_PAGE_REVIEW_RATING_DEFAULT]: (state, {payload}) => {
      return {...state, pageReviewRating: 0};
    },
    [types.SET_LOADING_LOAD_MORE_REVIEW_RATING]: (state, {payload}) => {
      return {...state, loadReviewRatingMoreLoading: payload};
    },
    [types.GET_LIST_REVIEW_RATING_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listReviewRating?.content.concat(content) || [];
      return {
        ...state,
        listReviewRating: payload,
        pageReviewRating: state.pageReviewRating + UNIT_INCREASE,
        hasLoadMoreReviewRating:
          state.pageReviewRating + UNIT_INCREASE + 1 < totalPages
            ? true
            : false,
      };
    },
    [types.GET_LIST_REVIEW_RATING_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
  },
  defaultState,
);
