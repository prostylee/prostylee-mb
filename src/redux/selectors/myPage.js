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

//LIST USER POST
export const getListUserPostLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listUserPostLoading || false,
);
export const getListUserPostLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listUserPostLoadmoreLoading || false,
);
export const getListUserPostSelector = createSelector(
  myPageReducer,
  (data) => data?.listUserPost || {},
);
export const getListUserPostCurrentPageSelector = createSelector(
  myPageReducer,
  (data) => data?.listUserPostCurrentPage || 0,
);
export const getListUserPostHasLoadmoreSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListUserPostLoadmore || false,
);
//LIST ORDER STATUS
export const getListUserOrderStatusLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listOrdersStatusLoading || false,
);
export const getListUserOrderStatusSelector = createSelector(
  myPageReducer,
  (data) => data?.listUserOrdersStatus || {},
);
// LIKED PRODUCT
export const getListProductLikedLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listLikedProductLoading,
);

export const getListProductLikedSelector = createSelector(
  myPageReducer,
  (data) => data?.listLikedProduct || {},
);

export const getLoadProductLikedMoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listLikedProductLoadmoreLoading || false,
);

export const getHasLoadMoreProductLikedSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListLikedProductLoadmore || false,
);

export const getPageProductLikedSelector = createSelector(
  myPageReducer,
  (data) => data?.listLikedProductCurrentPage || 0,
);

//SAVED PRODUCT

export const getListProductSavedLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listSavedProductLoading,
);

export const getListProductSavedSelector = createSelector(
  myPageReducer,
  (data) => data?.listSavedProduct || {},
);

export const getLoadProductSavedMoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listSavedProductLoadmoreLoading || false,
);

export const getHasLoadMoreProductSavedSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListSavedProductLoadmore || false,
);

export const getPageProductSavedSelector = createSelector(
  myPageReducer,
  (data) => data?.listSavedProductCurrentPage || 0,
);
