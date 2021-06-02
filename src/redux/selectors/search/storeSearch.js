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
