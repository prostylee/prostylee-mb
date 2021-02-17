import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;

export const getTopProduct = createSelector(
  storeReducer,
  (data) => data?.topProduct || {},
);

export const getTopProductLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isLoading,
);

export const getLoadingFuturedStoresSelector = createSelector(
  storeReducer,
  (data) => data?.isLoadingFuturedStores,
);

export const listOfFuturedStoresSelector = createSelector(
  storeReducer,
  (data) => data?.listOfFuturedStores || {},
);

export const loadMoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isLoadMoreLoading || false,
);

export const hasLoadMoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasLoadMore || false,
);

export const getPageSelector = createSelector(
  storeReducer,
  (data) => data?.page,
);
