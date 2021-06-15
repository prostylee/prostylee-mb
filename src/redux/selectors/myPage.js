import {createSelector} from 'reselect';

export const myPageReducer = (state) => state.myPage;

//List product from sale
export const getListProductSaleLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listProductSaleLoading,
);

export const getListProductSaleSelector = createSelector(
  myPageReducer,
  (data) => data?.listProductSale || {},
);

export const getLoadProductSaleMoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.loadProductSaleMoreLoading || false,
);

export const getHasLoadMoreProductSaleSelector = createSelector(
  myPageReducer,
  (data) => data?.hasLoadMoreProductSale || false,
);

export const getPageProductSaleSelector = createSelector(
  myPageReducer,
  (data) => data?.pageProductSale,
);

//List product from sale
export const getListProductSoldLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listProductSoldLoading,
);

export const getListProductSoldSelector = createSelector(
  myPageReducer,
  (data) => data?.listProductSold || {},
);

export const getLoadProductSoldMoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.loadProductSoldMoreLoading || false,
);

export const getHasLoadMoreProductSoldSelector = createSelector(
  myPageReducer,
  (data) => data?.hasLoadMoreProductSold || false,
);

export const getPageProductSoldSelector = createSelector(
  myPageReducer,
  (data) => data?.pageProductSold,
);
