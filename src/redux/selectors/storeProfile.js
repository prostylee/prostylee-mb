import {createSelector} from 'reselect';

export const storeProfileReducer = (state) => state.storeProfile;

export const getStoreLoadingSelector = createSelector(
  storeProfileReducer,
  (data) => data.storeProfileLoading || false,
);

export const getStoreInfoSelector = createSelector(
  storeProfileReducer,
  (data) => data?.storeInfo || null,
);

export const getStoreStatisticsSelector = createSelector(
  storeProfileReducer,
  (data) => data?.storeStatistics || null,
);

export const getStorePostSelector = createSelector(
  storeProfileReducer,
  (data) => data?.postList || null,
);

export const getStoreBestSellerProductLoadingSelector = createSelector(
  storeProfileReducer,
  (data) => data.bestSellerProductLoading || false,
);

export const getStoreBestSellerProductSelector = createSelector(
  storeProfileReducer,
  (data) => data?.bestSellerProduct || null,
);

export const getStoreAllProductLoadingSelector = createSelector(
  storeProfileReducer,
  (data) => data.allProductLoading || false,
);
export const getStoreAllProductLoadmoreLoadingSelector = createSelector(
  storeProfileReducer,
  (data) => data.allProductLoadmoreLoading || false,
);

export const getStoreAllProductSelector = createSelector(
  storeProfileReducer,
  (data) => data?.allProduct || null,
);

export const getStoreAllProductCurrentPage = createSelector(
  storeProfileReducer,
  (data) => data?.allProductCurrentPage || 0,
);

export const getStoreAllProductHasLoadmore = createSelector(
  storeProfileReducer,
  (data) => data?.hasAllProductLoadmore || false,
);

export const getStoreProfileFilterStateSelector = createSelector(
  storeProfileReducer,
  (data) => data?.storeProfileFilterState || {},
);
//STORE VOUCHER

export const getVouchersLoadingSelector = createSelector(
  storeProfileReducer,
  (data) => data?.isStoreVouchersLoading || false,
);
export const getVouchersLoadmoreLoadingSelector = createSelector(
  storeProfileReducer,
  (data) => data?.isStoreVouchersLoadmoreLoading || false,
);
export const getVouchersSelector = createSelector(
  storeProfileReducer,
  (data) => data?.storeVouchersData || {},
);
export const hasVouchersLoadmoreSelector = createSelector(
  storeProfileReducer,
  (data) => data?.hasStoreVouchersLoadmore || false,
);
export const getCurrentVouchersPageSelector = createSelector(
  storeProfileReducer,
  (data) => data?.storeVouchersPage || 0,
);

export const postSaveVoucherStatusSelector = createSelector(
  storeProfileReducer,
  (data) => data?.saveStoreVoucherStatus || '',
);
