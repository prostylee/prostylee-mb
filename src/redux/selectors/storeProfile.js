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
