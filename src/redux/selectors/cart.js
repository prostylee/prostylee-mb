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
