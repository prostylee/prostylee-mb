import {createSelector} from 'reselect';

export const storeReducer = (state) => state.store;

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
