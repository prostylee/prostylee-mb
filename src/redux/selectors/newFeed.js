import { createSelector } from 'reselect'

export const newFeedState = state => state.newFeed

export const getNewFeedSelector = createSelector(
  newFeedState,
  data => data?.newFeed || {},
)

