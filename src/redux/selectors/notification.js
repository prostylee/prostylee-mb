import {createSelector} from 'reselect';

export const searchReducer = (state) => state.notification;

//List LIST_NOTIFICATION
export const getListNotificationLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.listNotificationLoading,
);

export const getListNotificationSelector = createSelector(
  searchReducer,
  (data) => data?.listNotification || {},
);

export const getLoadListNotificationMoreLoading = createSelector(
  searchReducer,
  (data) => data?.loadListNotificationMoreLoading || false,
);

export const getHasLoadMoreListNotificationSelector = createSelector(
  searchReducer,
  (data) => data?.hasLoadMoreListNotification || false,
);

export const getPageListNotificationSelector = createSelector(
  searchReducer,
  (data) => data?.pageListNotification,
);

//List notification discount
export const getListNotificationDiscountLoadingSelector = createSelector(
  searchReducer,
  (data) => data?.listNotificationDiscountLoading,
);

export const getListNotificationDiscountSelector = createSelector(
  searchReducer,
  (data) => data?.listNotificationDiscount || {},
);

export const getLoadListNotificationDiscountMoreLoading = createSelector(
  searchReducer,
  (data) => data?.loadListNotificationDiscountMoreLoading || false,
);

export const getHasLoadMoreListNotificationDiscountSelector = createSelector(
  searchReducer,
  (data) => data?.hasLoadMoreListNotificationDiscount || false,
);

export const getPageListNotificationDiscountSelector = createSelector(
  searchReducer,
  (data) => data?.pageListNotificationDiscount,
);
