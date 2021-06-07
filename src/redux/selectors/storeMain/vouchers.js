import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;

// VOUCHERS
export const getVouchersLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isVouchersLoading || false,
);
export const getVouchersLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isVouchersLoadmoreLoading || false,
);
export const getVouchersSelector = createSelector(
  storeReducer,
  (data) => data?.vouchersData || {},
);
export const hasVouchersLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasVouchersLoadmore || false,
);
export const getCurrentVouchersPageSelector = createSelector(
  storeReducer,
  (data) => data?.vouchersPage || 0,
);
