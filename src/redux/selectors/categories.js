import {createSelector} from 'reselect';

export const categoriesReducer = (state) => state.categories;

export const getCategoriesParentSelectSelector = createSelector(
  categoriesReducer,
  (data) =>
    data?.categoriesParentSelect ||
    (data.listLeftCategories !== undefined &&
    data.listLeftCategories.content !== undefined
      ? data.listLeftCategories.content[0]
      : null),
);

export const getCategoriesSelectSelector = createSelector(
  categoriesReducer,
  (data) => data?.categoriesSelect || null,
);

//Left
export const getLeftLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.leftLoading,
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

//Right
export const getRightLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.rightLoading,
);

export const getListRightCategoriesSelector = createSelector(
  categoriesReducer,
  (data) => data?.listRightCategories || {},
);

export const getLoadRightCategoriesMoreLoadingSelector = createSelector(
  categoriesReducer,
  (data) => data?.loadRightCategoriesMoreLoading || false,
);

export const getHasLoadMoreRightCategoriesSelector = createSelector(
  categoriesReducer,
  (data) => data?.hasLoadMoreRightCategories || false,
);

export const getPageRightCategoriesSelector = createSelector(
  categoriesReducer,
  (data) => data?.pageRightCategories,
);
