import { createSelector } from 'reselect'

export const newFeedState = state => state.newFeed

export const getNewFeedSelector = createSelector(
  newFeedState,
  data => data?.newFeed || {},
)

export const getHasLoadMoreSelector = createSelector(
  newFeedState,
  data => data?.hasLoadMore || false,
)

export const getPageSelector = createSelector(
  newFeedState,
  data => data?.page || 0,
)

export const getLimitSelector = createSelector(
  newFeedState,
  data => data?.limit || 12,
)

export const getLoadMoreLoadingSelector = createSelector(
  newFeedState,
  data => data?.loadMoreLoading,
)
