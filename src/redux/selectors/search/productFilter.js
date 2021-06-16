import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List FEATURED_PRODUCT_SEARCH
export const getProductFilterLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.productsFilterLoading,
);

export const getProductFilterAttributeListSelector = createSelector(
  searchReducer,
  (data) => data?.productFilterList || [],
);
export const getProductFilterState = createSelector(
  searchReducer,
  (data) => data?.productFilterState || {},
);
