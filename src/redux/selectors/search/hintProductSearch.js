import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List HINT_PRODUCT_SEARCH
export const getHintProductSearchLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.hintProductSearchLoading,
);

export const getHintProductSearchSelector = createSelector(
  searchReducer,
  (data) => data?.hintProductSearch || {},
);

export const getLoadHintProductSearchMoreLoading = createSelector(
  searchReducer,
  (data) => data?.loadHintProductSearchMoreLoading || false,
);

export const getHasLoadMoreHintProductSearchSelector = createSelector(
  searchReducer,
  (data) => data?.hasLoadMoreHintProductSearch || false,
);

export const getPageHintProductSearchSelector = createSelector(
  searchReducer,
  (data) => data?.pageHintProductSearch,
);
