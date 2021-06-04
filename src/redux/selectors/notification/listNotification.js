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
