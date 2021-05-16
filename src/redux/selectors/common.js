import {createSelector} from 'reselect';

export const commonState = (state) => state.common;

export const targetTypeSelector = createSelector(
  commonState,
  (data) => data?.targetType || 'STORE',
);

export const isFullViewSelector = createSelector(
  commonState,
  (data) => data?.isFullView || false,
);
