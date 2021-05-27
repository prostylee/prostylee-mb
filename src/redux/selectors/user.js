import {createSelector} from 'reselect';

export const userReducer = (state) => state.user;

export const profileSelector = createSelector(
  userReducer,
  (data) => data?.profile || null,
);

export const userTokenSelector = createSelector(
  userReducer,
  (data) => data?.userToken || null,
);

export const statisticsSelector = createSelector(
  userReducer,
  (data) => data?.statistics || null,
);

export const postOfUserSlector = createSelector(
  userReducer,
  (data) => data?.postsOfUser || null,
);

export const productByUserSelector = createSelector(
  userReducer,
  (data) => data?.productsByUser || null,
);
