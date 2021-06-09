import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;
// NEARBY STORE
export const getNearbyStoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isNearbyStoreLoading || false,
);
export const getNearbyStoreLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isNearbyStoreLoadmoreLoading || false,
);
export const getNearbyStoreSelector = createSelector(
  storeReducer,
  (data) => data?.nearbyStoreData || {},
);
export const hasNearbyStoreLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasNearbyStoreLoadmore || false,
);
export const getCurrentNearbyStorePageSelector = createSelector(
  storeReducer,
  (data) => data?.nearbyStorePage || 0,
);
