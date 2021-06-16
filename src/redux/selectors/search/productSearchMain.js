import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List FEATURED_PRODUCT_SEARCH
export const getProductSearchLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.productsSearchLoading || false,
);
export const getProductSearchLoadmoreLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.productSearchLoadmoreLoading,
);

export const getProductSearchListSelector = createSelector(
  searchReducer,
  (data) => data?.productSearchList || [],
);
export const getProductSearchHasLoadmoreSelector = createSelector(
  searchReducer,
  (data) => data?.hasProductSearchLoadMore || false,
);
export const getProductSearchCurrentPageSelector = createSelector(
  searchReducer,
  (data) => data?.pageProductSearch || 0,
);
