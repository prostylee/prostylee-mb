import {createSelector} from 'reselect';

export const productReducer = (state) => state.reviewRating;

//List product from categories
export const getListReviewRatingLoadingSelector = createSelector(
  productReducer,
  (data) => data?.listReviewRatingLoading,
);

export const getListReviewRatingSelector = createSelector(
  productReducer,
  (data) => data?.listReviewRating || {},
);

export const getLoadReviewRatingMoreLoadingSelector = createSelector(
  productReducer,
  (data) => data?.loadReviewRatingMoreLoading || false,
);

export const getHasLoadMoreReviewRatingSelector = createSelector(
  productReducer,
  (data) => data?.hasLoadMoreReviewRating || false,
);

export const getPageReviewRatingSelector = createSelector(
  productReducer,
  (data) => data?.pageReviewRating,
);
