import {createSelector} from 'reselect';

export const cartReducer = (state) => state.cart;

//List Cart
export const getCartLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.cartLoading,
);

export const getListCartSelector = createSelector(
  cartReducer,
  (data) => data?.listCart || [],
);

export const getCountCartSelector = createSelector(
  cartReducer,
  (data) => data?.listCart.length || 0,
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

//List Payment
export const getPaymentLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.paymentLoading || false,
);

export const getListPaymentSelector = createSelector(
  cartReducer,
  (data) => data?.listPayment || [],
);

export const getPaymentUseSelector = createSelector(
  cartReducer,
  (data) => data?.paymentUse,
);

//List Recent
export const getRecentLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.recentLoading || false,
);

export const getListRecentSelector = createSelector(
  cartReducer,
  (data) => data?.listRecent || [],
);

//List Suggestion
export const getSuggestionLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.suggestionLoading || false,
);

export const getListSuggestionSelector = createSelector(
  cartReducer,
  (data) => data?.listSuggestion || [],
);

//List Voucher
export const getVoucherLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.voucherLoading,
);

export const getListVoucherSelector = createSelector(
  cartReducer,
  (data) => data?.listVoucher || {},
);

export const getLoadVoucherMoreLoadingSelector = createSelector(
  cartReducer,
  (data) => data?.loadVoucherMoreLoading || false,
);

export const getHasLoadMoreVoucherSelector = createSelector(
  cartReducer,
  (data) => data?.hasLoadMoreVoucher || false,
);

export const getPageVoucherSelector = createSelector(
  cartReducer,
  (data) => data?.pageVoucher,
);

export const getVoucherUseSelector = createSelector(
  cartReducer,
  (data) => data?.voucherUse,
);
