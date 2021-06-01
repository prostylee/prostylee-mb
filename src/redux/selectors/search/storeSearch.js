import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List FEATURED_PRODUCT_SEARCH
export const getStoreSearchLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.storeSearchLoading,
);

export const getStoreSearchListSelector = createSelector(
  searchReducer,
  (data) => data?.storeList || [],
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
