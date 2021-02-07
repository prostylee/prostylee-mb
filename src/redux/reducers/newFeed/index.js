import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'prostylee/NEW_FEED/SET_LOADING',
  GET_NEW_FEED: 'prostylee/NEW_FEED/GET_NEW_FEED',
  GET_NEW_FEED_SUCCESS: 'prostylee/NEW_FEED/GET_NEW_SUCCESS',
  GET_NEW_FEED_FAILED: 'prostylee/NEW_FEED/GET_NEW_FEED_FAILED',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  getNewFeed: createAction(types.GET_NEW_FEED),
  getNewFeedSuccess: createAction(types.GET_NEW_FEED_SUCCESS),
  getNewFeedFailed: createAction(types.GET_NEW_FEED_FAILED),
};

const intialState = {
  isLoading: false,
  newFeed: {},
  page: 0,
  limit: 12,
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {status}) => {
      return {...state, isLoading: status};
    },
    [types.GET_NEW_FEED_SUCCESS]: (state, {payload}) => {
      return {...state, newFeed: payload};
    },
    [types.GET_NEW_FEED_FAILED]: (state, {payload}) => {
      return {...state, newFeed: {}};
    },
  },
  intialState,
);
