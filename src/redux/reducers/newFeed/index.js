import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'prostylee/NEW_FEED/SET_LOADING',
  GET_NEW_FEED: 'prostylee/NEW_FEED/GET_NEW_FEED',
  GET_NEW_FEED_SUCCESS: 'prostylee/NEW_FEED/GET_NEW_SUCCESS',
  GET_NEW_FEED_FAILED: 'prostylee/NEW_FEED/GET_NEW_FEED_FAILED',
  SET_LOAD_MORE_LOADING: 'prostylee/NEW_FEED/SET_LOAD_MORE_LOADING',
  HANDLE_LOAD_MORE: 'prostylee/NEW_FEED/HANDLE_LOAD_MORE',
  HANDLE_LOAD_MORE_SUCCESS: 'prostylee/NEW_FEED/HANDLE_LOAD_MORE_SUCCESS',
  HANDLE_LOAD_MORE_FAILED: 'prostylee/NEW_FEED/HANDLE_LOAD_MORE_FAILED',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  getNewFeed: createAction(types.GET_NEW_FEED),
  getNewFeedSuccess: createAction(types.GET_NEW_FEED_SUCCESS),
  getNewFeedFailed: createAction(types.GET_NEW_FEED_FAILED),
  handleLoadMoreLoading: createAction(types.SET_LOAD_MORE_LOADING),
  handleLoadMore: createAction(types.HANDLE_LOAD_MORE),
  handleLoadMoreSuccess: createAction(types.HANDLE_LOAD_MORE_SUCCESS),
  handleLoadMoreFailed: createAction(types.HANDLE_LOAD_MORE_FAILED),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
const intialState = {
  isLoading: false,
  loadMoreLoading: false,
  newFeed: {},
  threeFirstNewFeedItem: {},
  page: 0,
  limit: 12,
  hasLoadMore: false,
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SET_LOAD_MORE_LOADING]: (state, {payload}) => {
      return {...state, loadMoreLoading: payload};
    },
    [types.GET_NEW_FEED_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      const content = payload?.content;
      const threeFirstItem =
        content?.length && content?.length > 3 ? content.slice(0, 3) : [];
      const restContent = content.slice(3, state.limit);
      return {
        ...state,
        page: PAGE_INIT,
        newFeed: {...payload, content: restContent},
        hasLoadMore: state.page < totalPages ? true : false,
        threeFirstItem: {...payload, content: threeFirstItem},
      };
    },
    [types.GET_NEW_FEED_FAILED]: (state, {payload}) => {
      return {...state, newFeed: {}};
    },
    [types.HANDLE_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.newFeed?.content.concat(content) || [];
      return {
        ...state,
        newFeed: payload,
        page: state.page + UNIT_INCREASE,
        hasLoadMore: state.page + 1 < totalPages ? true : false,
      };
    },
    [types.HANDLE_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
  },
  intialState,
);
