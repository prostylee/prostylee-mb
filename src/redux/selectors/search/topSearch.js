import {createSelector} from 'reselect';

export const searchReducer = (state) => state.search;

//List TOP_SEARCH
export const getTopSearchLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.topSearchLoading,
);

export const getTopSearchSelector = createSelector(
  searchReducer,
  (data) => data?.topSearch || {},
);

export const getLoadTopSearchMoreLoading = createSelector(
  searchReducer,
  (data) => data?.loadTopSearchMoreLoading || false,
);

export const getHasLoadMoreTopSearchSelector = createSelector(
  searchReducer,
  (data) => data?.hasLoadMoreTopSearch || false,
);

export const getPageTopSearchSelector = createSelector(
  searchReducer,
  (data) => data?.pageTopSearch,
);
