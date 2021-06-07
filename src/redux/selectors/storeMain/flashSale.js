import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;

// FLASH SALES
export const getFlashSaleLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isFlashSaleLoading || false,
);
export const getFlashSaleLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isFlashSaleLoadmoreLoading || false,
);
export const getFlashSaleSelector = createSelector(
  storeReducer,
  (data) => data?.FlashSaleData || {},
);
export const hasFlashSaleLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasFlashSaleLoadmore || false,
);
export const getCurrentFlashSalePageSelector = createSelector(
  storeReducer,
  (data) => data?.FlashSalePage || 0,
);
