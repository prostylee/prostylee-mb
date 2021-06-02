import {createSelector} from 'reselect';

export const cartReducer = (state) => state.cart;

//Left
export const getCartLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.cartLoading,
);

export const getListCartSelector = createSelector(
  cartReducer,
  (data) => data?.listCart || [],
);

export const getLoadCartMoreLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.loadLeftCartMoreLoading || false,
);

export const getHasLoadMoreCartSelector = createSelector(
  cartReducer,
  (data) => data?.hasLoadMoreCategories || false,
);

export const getPageCategoriesSelector = createSelector(
  cartReducer,
  (data) => data?.pageCategories,
);
