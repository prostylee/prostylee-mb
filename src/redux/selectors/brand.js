import {createSelector} from 'reselect';

export const productBrandReducer = (state) => state.brand;

//List product from categories
export const getListProductLoadingSelector = createSelector(
  productBrandReducer,
  (data) => data?.listProductLoading,
);

export const getListProductSelector = createSelector(
  productBrandReducer,
  (data) => data?.listProduct || {},
);

export const getLoadProductMoreLoadingSelector = createSelector(
  productBrandReducer,
  (data) => data?.loadProductMoreLoading || false,
);

export const getHasLoadMoreProductSelector = createSelector(
  productBrandReducer,
  (data) => data?.hasLoadMoreProduct || false,
);

export const getPageProductSelector = createSelector(
  productBrandReducer,
  (data) => data?.pageProduct,
);

export const getBrandProductFilterStateSelector = createSelector(
  productBrandReducer,
  (data) => data?.productCategoryFilterState || {},
);

export const getSelectedBrandSelector = createSelector(
  productBrandReducer,
  (data) => data?.selectedBrand || {},
);
