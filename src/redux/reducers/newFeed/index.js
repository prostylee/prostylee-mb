import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'prostylee/NEW_FEED/SET_LOADING',
  GET_NEW_FEED: 'prostylee/NEW_FEED/GET_NEW_FEED',
  GET_NEW_FEED_SUCCESS: 'prostylee/NEW_FEED/GET_NEW_SUCCESS',
  GET_NEW_FEED_FAILED: 'prostylee/NEW_FEED/GET_NEW_FEED_FAILED',
  RESET_NEW_FEED_PAGE: 'prostylee/NEW_FEED/RESET_NEW_FEED_PAGE',
  SET_LOAD_MORE_LOADING: 'prostylee/NEW_FEED/SET_LOAD_MORE_LOADING',
  HANDLE_LOAD_MORE: 'prostylee/NEW_FEED/HANDLE_LOAD_MORE',
  HANDLE_LOAD_MORE_SUCCESS: 'prostylee/NEW_FEED/HANDLE_LOAD_MORE_SUCCESS',
  HANDLE_LOAD_MORE_FAILED: 'prostylee/NEW_FEED/HANDLE_LOAD_MORE_FAILED',
  GET_STORIES_BY_STORE: 'prostylee/NEW_FEED/GET_STORIES_BY_STORE',
  SET_LOADING_STORIES: 'prostylee/NEW_FEED/SET_LOADING_STORIES',
  GET_STORIES_BY_STORE_SUCCESS:
    'prostylee/NEW_FEED/GET_STORIES_BY_STORE_SUCCESS',
  GET_STORIES_BY_STORE_FAILED: 'prostylee/NEW_FEED/GET_STORIES_BY_STORE_FAILED',
  GET_STORIES_BY_USER: 'prostylee/NEW_FEED/GET_STORIES_BY_USER',
  GET_STORIES_BY_USER_SUCCESS: 'prostylee/NEW_FEED/GET_STORIES_BY_USER_SUCCESS',
  GET_STORIES_BY_USER_FAILED: 'prostylee/NEW_FEED/GET_STORIES_BY_USER_FAILED',

  GET_PRODUCT_OF_STORIES: 'prostylee/NEW_FEED/GET_PRODUCT_OF_STORIES',
  GET_PRODUCT_OF_STORIES_SUCCESS:
    'prostylee/NEW_FEED/GET_PRODUCT_OF_STORIES_SUCCESS',
  GET_PRODUCT_OF_STORIES_FAILED:
    'prostylee/NEW_FEED/GET_PRODUCT_OF_STORIES_FAILED',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  getNewFeed: createAction(types.GET_NEW_FEED),
  getNewFeedSuccess: createAction(types.GET_NEW_FEED_SUCCESS),
  getNewFeedFailed: createAction(types.GET_NEW_FEED_FAILED),
  resetPage: createAction(types.RESET_NEW_FEED_PAGE),
  handleLoadMoreLoading: createAction(types.SET_LOAD_MORE_LOADING),
  handleLoadMore: createAction(types.HANDLE_LOAD_MORE),
  handleLoadMoreSuccess: createAction(types.HANDLE_LOAD_MORE_SUCCESS),
  handleLoadMoreFailed: createAction(types.HANDLE_LOAD_MORE_FAILED),
  getStoriesByStore: createAction(types.GET_STORIES_BY_STORE),
  getStoriesByStoreSuccess: createAction(types.GET_STORIES_BY_STORE_SUCCESS),
  getStoriesByStoreFailed: createAction(types.GET_STORIES_BY_STORE_FAILED),
  setLoadingStories: createAction(types.SET_LOADING_STORIES),
  getStoriesByUser: createAction(types.GET_STORIES_BY_USER),
  getStoriesByUserSuccess: createAction(types.GET_STORIES_BY_USER_SUCCESS),
  getStoriesByUserFailed: createAction(types.GET_STORIES_BY_USER_FAILED),

  getProductOfStory: createAction(types.GET_PRODUCT_OF_STORIES),
  getProductOfStorySuccess: createAction(types.GET_PRODUCT_OF_STORIES_SUCCESS),
  getProductOfStoryFailed: createAction(types.GET_PRODUCT_OF_STORIES_FAILED),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
const intialState = {
  isLoading: false,
  storiesLoading: false,
  loadMoreLoading: false,
  stories: {},
  newFeed: {},
  threeFirstNewFeedItem: {},
  productOfStory: {},
  storeOfStory: {},
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
    [types.SET_LOADING_STORIES]: (state, {payload}) => {
      return {...state, page: 0};
    },
    [types.RESET_NEW_FEED_PAGE]: (state, {payload}) => {
      return {...state, storiesLoading: payload};
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
    [types.GET_STORIES_BY_STORE_SUCCESS]: (state, {payload}) => {
      return {...state, stories: payload};
    },
    [types.GET_STORIES_BY_STORE_FAILED]: (state, {payload}) => {
      return {...state, stories: {}};
    },
    [types.GET_STORIES_BY_USER_SUCCESS]: (state, {payload}) => {
      return {...state, stories: payload};
    },
    [types.GET_STORIES_BY_USER_FAILED]: (state, {payload}) => {
      return {...state, stories: {}};
    },
    [types.GET_PRODUCT_OF_STORIES_SUCCESS]: (state, {payload}) => {
      return {...state, productOfStory: payload};
    },
    [types.GET_PRODUCT_OF_STORIES_FAILED]: (state, {payload}) => {
      return {...state, productOfStory: {}};
    },
  },
  intialState,
);
