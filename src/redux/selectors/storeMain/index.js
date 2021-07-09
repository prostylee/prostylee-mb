import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;

export const getStoreMainLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isStoreLoading || false,
);

//List FEATURED_PRODUCT_SEARCH
export const getTopBannerSelector = createSelector(
  storeReducer,
  (data) => data?.topBannerList || {},
);

export const getMidBannerSelector = createSelector(
  storeReducer,
  (data) => data?.midBannerList || {},
);

//BRAND
export const getBrandListLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isBrandlistLoading || false,
);
export const getBrandListLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isBrandlistLoadmoreLoading || false,
);
export const getBrandListCurrentPageSelector = createSelector(
  storeReducer,
  (data) => data?.brandListCurrentPage || 0,
);
export const getBrandListHasLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasBrandlistLoadmore || false,
);

export const getBrandListSelector = createSelector(
  storeReducer,
  (data) => data?.brandList || {},
);

export const getCategoryListSelector = createSelector(
  storeReducer,
  (data) => data?.categoryList || {},
);

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

// PERSONAL SALERS
export const getPersonalSalersLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isPersonalSalersLoading || false,
);
export const getPersonalSalersLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isPersonalSalersLoadmoreLoading || false,
);
export const getPersonalSalersSelector = createSelector(
  storeReducer,
  (data) => data?.personalSalersData || {},
);
export const hasPersonalSalersLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasPersonalSalersLoadmore || false,
);

export const getPersonalSalersCurrentPageSelector = createSelector(
  storeReducer,
  (data) => data?.personalSalersPage || 0,
);

//BOTTOM TAB
export const getBottomTabListSelector = createSelector(
  storeReducer,
  (data) => data?.bottomTabList || [],
);
