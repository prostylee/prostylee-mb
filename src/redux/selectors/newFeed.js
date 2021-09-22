import {createSelector} from 'reselect';

export const newFeedState = (state) => state.newFeed;

export const getNewFeedSelector = createSelector(
  newFeedState,
  (data) => data?.newFeed || {},
);

export const getHasLoadMoreSelector = createSelector(
  newFeedState,
  (data) => data?.hasLoadMore || false,
);

export const getPageSelector = createSelector(
  newFeedState,
  (data) => data?.page || 0,
);

export const getLimitSelector = createSelector(
  newFeedState,
  (data) => data?.limit || 12,
);

export const getLoadMoreLoadingSelector = createSelector(
  newFeedState,
  (data) => data?.loadMoreLoading,
);

export const getNewFeedLoadingSelector = createSelector(
  newFeedState,
  (data) => data?.isLoading,
);

export const threeFirstNewFeedItemSelector = createSelector(
  newFeedState,
  (data) => data?.threeFirstItem || {},
);

export const getStoriesLoading = createSelector(
  newFeedState,
  (data) => data?.storiesLoading,
);

export const getStories = createSelector(
  newFeedState,
  (data) => data?.stories || {},
);

export const getStoreMini = createSelector(
  newFeedState,
  (data) => data?.storeMini || {},
);

export const getStoreMiniLoadMoreSelector = createSelector(
  newFeedState,
  (data) => data?.hasLoadMoreStoreMini || false,
);

export const getHasLoadMoreStoreMiniSelector = createSelector(
  newFeedState,
  (data) => data?.hasLoadMoreStoreMini || false,
);

export const getPageStoreMiniSelector = createSelector(
  newFeedState,
  (data) => data?.pageStoreMini || 0,
);

export const getLimitStoreMiniSelector = createSelector(
  newFeedState,
  (data) => data?.limitStoreMini || 12,
);

export const getLoadMoreStoreMiniLoadingSelector = createSelector(
  newFeedState,
  (data) => data?.loadMoreStoreMiniLoading,
);

export const getStoreMiniLoadingSelector = createSelector(
  newFeedState,
  (data) => data?.storeMiniLoading,
);

export const getHasLoadMoreStoriesSelector = createSelector(
  newFeedState,
  (data) => data?.hasLoadMoreStories,
);
