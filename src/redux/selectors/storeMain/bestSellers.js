import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;

// FLASH SALES
export const getBestSellersLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isBestSellersLoading || false,
);
export const getBestSellersLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isBestSellersLoadmoreLoading || false,
);
export const getBestSellersSelector = createSelector(
  storeReducer,
  (data) => data?.bestSellersData || {},
);
export const hasBestSellersLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasBestSellersLoadmore || false,
);
export const getCurrentBestSellersPageSelector = createSelector(
  storeReducer,
  (data) => data?.bestSellersPage || 0,
);
