import {createSelector} from 'reselect';

export const categoriesReducer = (state) => state.categories;

export const getTopProduct = createSelector(
  categoriesReducer,
  (data) => data?.topProduct || {},
);

export const getTopProductLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.isLoading,
);

export const getLoadingFuturedcategoriessSelector = createSelector(
  categoriesReducer,
  (data) => data?.isLoadingFuturedcategoriess,
);

export const listOfFuturedcategoriessSelector = createSelector(
  categoriesReducer,
  (data) => data?.listOfFuturedcategoriess || {},
);

export const loadMoreLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.isLoadMoreLoading || false,
);

export const hasLoadMoreSelector = createSelector(
  categoriesReducer,
  (data) => data?.hasLoadMore || false,
);

export const getPageSelector = createSelector(
  categoriesReducer,
  (data) => data?.page,
);
