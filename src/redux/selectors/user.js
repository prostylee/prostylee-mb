import {createSelector} from 'reselect';

export const userReducer = (state) => state.user;

export const profileSelector = createSelector(
  userReducer,
  (data) => data?.profile || null,
);

export const statisticsSelector = createSelector(
  userReducer,
  (data) => data?.statistics || null,
);
