import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List FEATURED_PRODUCT_SEARCH
export const getFeaturedProductSearchLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.featuredProductSearchLoading,
);

export const getFeaturedProductSearchSelector = createSelector(
  searchReducer,
  (data) => data?.featuredProductSearch || {},
);

export const getLoadFeaturedProductSearchMoreLoading = createSelector(
  searchReducer,
  (data) => data?.loadFeaturedProductSearchMoreLoading || false,
);

export const getHasLoadMoreFeaturedProductSearchSelector = createSelector(
  searchReducer,
  (data) => data?.hasLoadMoreFeaturedProductSearch || false,
);

export const getPageFeaturedProductSearchSelector = createSelector(
  searchReducer,
  (data) => data?.pageFeaturedProductSearch,
);
