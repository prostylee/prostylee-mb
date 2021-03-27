import {createSelector} from 'reselect';

export const dynamicUserState = (state) => state.dynamicUsers;

export const listDynamicUsersSelector = createSelector(
  dynamicUserState,
  (data) => data?.dynamicUsers || {},
);

export const loadingSelector = createSelector(
  dynamicUserState,
  (data) => data?.isLoading || false,
);
