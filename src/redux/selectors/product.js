import {createSelector} from 'reselect';

export const productReducer = (state) => state.product;

//List product from categories
export const getListProductLoadingSelector = createSelector(
  productReducer,
  (data) => data?.listProductLoading,
);

export const getListProductSelector = createSelector(
  productReducer,
  (data) => data?.listProduct || {},
);

export const getLoadProductMoreLoadingSelector = createSelector(
  productReducer,
  (data) => data?.loadProductMoreLoading || false,
);

export const getHasLoadMoreProductSelector = createSelector(
  productReducer,
  (data) => data?.hasLoadMoreProduct || false,
);

export const getPageProductSelector = createSelector(
  productReducer,
  (data) => data?.pageProduct,
);
