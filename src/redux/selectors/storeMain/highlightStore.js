import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;
// HIGHLIGHT STORE
export const getHighlightStoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isHighlightStoreLoading || false,
);
export const getHighlightStoreLoadmoreLoadingSelector = createSelector(
  storeReducer,
  (data) => data?.isHighlightStoreLoadmoreLoading || false,
);
export const getHighlightStoreSelector = createSelector(
  storeReducer,
  (data) => data?.highlightStoreData || {},
);
export const hasHighlightStoreLoadmoreSelector = createSelector(
  storeReducer,
  (data) => data?.hasHighlightStoreLoadmore || false,
);
export const getCurrentHighlightStorePageSelector = createSelector(
  storeReducer,
  (data) => data?.highlightStorePage || 0,
);
