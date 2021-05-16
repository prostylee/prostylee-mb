import {createSelector} from 'reselect';
import {storeReducer} from './stores';

export const categoriesReducer = (state) => state.categories;

export const getLeftLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.leftLoading,
);

export const getCategoriesParentSelectSelector = createSelector(
  categoriesReducer,
  (data) => data?.categoriesParentSelect,
);

export const getListLeftCategoriesSelector = createSelector(
  categoriesReducer,
  (data) => data?.listLeftCategories || {},
);

export const getLoadLeftCategoriesMoreLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.loadLeftCategoriesMoreLoading || false,
);

export const getHasLoadMoreLeftCategoriesSelector = createSelector(
  categoriesReducer,
  (data) => data?.hasLoadMoreLeftCategories || false,
);

export const getPageLeftCategoriesSelector = createSelector(
  categoriesReducer,
  (data) => data?.pageLeftCategories,
);
