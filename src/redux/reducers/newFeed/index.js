import {createAction, handleActions} from 'redux-actions';
import {FIRST_SLICE_ITEM, LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

export const types = {
  SET_LOADING: 'SET_LOADING',
  GET_NEW_FEED: 'GET_NEW_FEED',
  GET_NEW_FEED_SUCCESS: 'GET_NEW_SUCCESS',
  GET_NEW_FEED_FAILED: 'GET_NEW_FEED_FAILED',
  GET_STORIES_BY_USER_MORE: 'GET_STORIES_BY_USER_MORE',
  GET_STORIES_BY_USER_MORE_SUCCESS: 'GET_STORIES_BY_USER_MORE_SUCCESS',
  GET_STORIES_BY_USER_MORE_FAILED: 'GET_STORIES_BY_USER_MORE_FAILED',
  RESET_NEW_FEED_PAGE: 'RESET_NEW_FEED_PAGE',
  SET_LOAD_MORE_LOADING: 'SET_LOAD_MORE_LOADING',
  HANDLE_LOAD_MORE: 'HANDLE_LOAD_MORE',
  HANDLE_LOAD_MORE_SUCCESS: 'HANDLE_LOAD_MORE_SUCCESS',
  HANDLE_LOAD_MORE_FAILED: 'HANDLE_LOAD_MORE_FAILED',
  GET_STORIES_BY_STORE: 'GET_STORIES_BY_STORE',
  SET_LOADING_STORIES: 'SET_LOADING_STORIES',
  GET_STORIES_BY_STORE_SUCCESS: 'GET_STORIES_BY_STORE_SUCCESS',
  GET_STORIES_BY_STORE_FAILED: 'GET_STORIES_BY_STORE_FAILED',
  GET_STORIES_BY_USER: 'GET_STORIES_BY_USER',
  GET_STORIES_BY_USER_SUCCESS: 'GET_STORIES_BY_USER_SUCCESS',
  GET_STORIES_BY_USER_FAILED: 'GET_STORIES_BY_USER_FAILED',

  GET_PRODUCT_OF_STORIES: 'GET_PRODUCT_OF_STORIES',
  GET_PRODUCT_OF_STORIES_SUCCESS: 'GET_PRODUCT_OF_STORIES_SUCCESS',
  GET_PRODUCT_OF_STORIES_FAILED: 'GET_PRODUCT_OF_STORIES_FAILED',

  GET_STORE_MINI_LOADING: 'GET_STORE_MINI_LOADING',
  GET_STORE_MINI: 'GET_STORE_MINI',
  GET_STORE_MINI_SUCCESS: 'GET_STORE_MINI_SUCCESS',
  GET_STORE_MINI_FAIL: 'GET_STORE_MINI_FAIL',
  SET_LOAD_MORE_STORE_MINI_LOADING: 'SET_LOAD_MORE_STORE_MINI_LOADING',
  GET_STORE_MINI_LOAD_MORE: 'GET_STORE_MINI_LOAD_MORE',
  GET_STORE_MINI_LOAD_MORE_SUCCESS: 'GET_STORE_MINI_LOAD_MORE_SUCCESS',
  GET_STORE_MINI_LOAD_MORE_FAILED: 'GET_STORE_MINI_LOAD_MORE_FAILED',

  ADD_NEW_FEED_STORE: 'ADD_NEW_FEED_STORE',
  REMOVE_NEW_FEED_STORE: 'REMOVE_NEW_FEED_STORE',

  POST_STORY: 'POST_STORY',
  POST_STORY_SUCCESS: 'POST_STORY_SUCCESS',
  POST_STORY_FAIL: 'POST_STORY_FAIL',

  SET_LOCAL_FOLLOWED_STORE: 'SET_LOCAL_FOLLOWED_STORE',
  SET_LOCAL_FOLLOWED_USER: 'SET_LOCAL_FOLLOWED_USER',
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

  getStoriesByUserMore: createAction(types.GET_STORIES_BY_USER_MORE),
  getStoriesByUserMoreSuccess: createAction(
    types.GET_STORIES_BY_USER_MORE_SUCCESS,
  ),
  getStoriesByUserMoreFailed: createAction(
    types.GET_STORIES_BY_USER_MORE_FAILED,
  ),

  getProductOfStory: createAction(types.GET_PRODUCT_OF_STORIES),
  getProductOfStorySuccess: createAction(types.GET_PRODUCT_OF_STORIES_SUCCESS),
  getProductOfStoryFailed: createAction(types.GET_PRODUCT_OF_STORIES_FAILED),

  getStoreMiniLoading: createAction(types.GET_STORE_MINI_LOADING),
  getStoreMini: createAction(types.GET_STORE_MINI),
  getStoreMiniSuccess: createAction(types.GET_STORE_MINI_SUCCESS),
  getStoreMiniFail: createAction(types.GET_STORE_MINI_FAIL),
  getStoreMiniLoadMoreLoading: createAction(
    types.SET_LOAD_MORE_STORE_MINI_LOADING,
  ),
  getStoreMiniLoadMore: createAction(types.GET_STORE_MINI_LOAD_MORE),
  getLoadMoreStoreMiniSuccess: createAction(
    types.GET_STORE_MINI_LOAD_MORE_SUCCESS,
  ),
  getStoreMiniLoadMoreFailed: createAction(
    types.GET_STORE_MINI_LOAD_MORE_FAILED,
  ),

  addNewFeedStore: createAction(types.ADD_NEW_FEED_STORE),
  removeNewFeedStore: createAction(types.REMOVE_NEW_FEED_STORE),

  postStory: createAction(types.POST_STORY),
  postStorySuccess: createAction(types.POST_STORY_SUCCESS),
  postStoryFail: createAction(types.POST_STORY_FAIL),
  setLocalFollowedStore: createAction(types.SET_LOCAL_FOLLOWED_STORE),
  setLocalFollowedUser: createAction(types.SET_LOCAL_FOLLOWED_USER),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
const intialState = {
  isLoading: false,
  storiesLoading: false,
  loadMoreLoading: false,
  stories: {},
  pageStories: PAGE_DEFAULT,
  limitStories: LIMIT_DEFAULT,
  hasLoadMoreStories: false,
  newFeed: {},
  newFeedStoreSelect: {},
  threeFirstNewFeedItem: {},
  productOfStory: {},
  storeOfStory: {},
  storeMini: {},
  storeMiniLoading: false,
  page: PAGE_DEFAULT,
  limit: LIMIT_DEFAULT,
  hasLoadMore: false,

  loadMoreStoreMiniLoading: false,
  hasLoadMoreStoreMini: false,
  pageStoreMini: PAGE_DEFAULT,
  limitStoreMini: LIMIT_DEFAULT,

  localFollowedStore: [],
  localFollowedUser: [],
};

export const selectors = {
  getStoreMini: (state) => state.newFeed.storeMini,
  getStoreMiniLoading: (state) => state.newFeed.storeMiniLoading,
  getNewFeedStore: (state) => state.newFeed.newFeedStoreSelect,
  getLocalFollowedStore: (state) => state.newFeed.localFollowedStore,
  getLocalFollowedUser: (state) => state.newFeed.localFollowedUser,
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SET_LOAD_MORE_LOADING]: (state, {payload}) => {
      return {...state, loadMoreLoading: payload};
    },
    [types.RESET_NEW_FEED_PAGE]: (state, {payload}) => {
      return {...state, page: 0};
    },
    [types.SET_LOADING_STORIES]: (state, {payload}) => {
      return {...state, storiesLoading: payload};
    },
    [types.GET_NEW_FEED_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      const content = payload?.content;
      const threeFirstItem = content?.length
        ? content.slice(0, FIRST_SLICE_ITEM)
        : [];
      const restContent = content.slice(FIRST_SLICE_ITEM, state.limit);
      return {
        ...state,
        page: PAGE_INIT,
        newFeed: {...payload, content: restContent},
        hasLoadMore: state.page < totalPages,
        threeFirstItem: {...payload, content: threeFirstItem},
      };
    },
    [types.GET_NEW_FEED_FAILED]: (state, {payload}) => {
      return {
        ...state,
        page: PAGE_INIT,
        newFeed: {},
        hasLoadMore: false,
        threeFirstItem: {},
      };
    },
    [types.HANDLE_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.newFeed?.content.concat(content) || [];
      return {
        ...state,
        newFeed: payload,
        page: state.page + UNIT_INCREASE,
        hasLoadMore: state.page + 1 < totalPages,
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
      const isLastPage = payload.last || false;
      return {
        ...state,
        stories: payload,
        hasLoadMoreStories: !isLastPage,
        pageStories: PAGE_DEFAULT + 1,
      };
    },
    [types.GET_STORIES_BY_USER_FAILED]: (state, {payload}) => {
      return {...state, stories: {}};
    },
    [types.GET_STORIES_BY_USER_MORE_SUCCESS]: (state, {payload}) => {
      const isLastPage = payload.last || false;
      return {
        ...state,
        stories: payload,
        hasLoadMoreStories: !isLastPage,
        pageStories: state.pageStories + 1,
      };
    },
    [types.GET_STORIES_BY_USER_MORE_FAILED]: (state, {payload}) => {
      return {...state, stories: {}};
    },
    [types.GET_PRODUCT_OF_STORIES_SUCCESS]: (state, {payload}) => {
      return {...state, productOfStory: payload};
    },
    [types.GET_PRODUCT_OF_STORIES_FAILED]: (state, {payload}) => {
      return {...state, productOfStory: {}};
    },
    [types.GET_STORE_MINI_LOADING]: (state, {payload}) => {
      return {...state, storeMiniLoading: payload};
    },
    [types.GET_STORE_MINI_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      const content = payload?.content;
      const restContent = content.slice(FIRST_SLICE_ITEM, state.limitStoreMini);
      return {
        ...state,
        pageStoreMini: PAGE_INIT,
        storeMini: {...payload, content: restContent},
        hasLoadMoreStoreMini: state.pageStoreMini < totalPages,
      };
    },
    [types.GET_STORE_MINI_FAIL]: (state, {payload}) => {
      return {...state, storeMini: {}};
    },

    [types.SET_LOAD_MORE_STORE_MINI_LOADING]: (state, {payload}) => {
      return {...state, loadMoreStoreMiniLoading: payload};
    },

    [types.GET_STORE_MINI_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.storeMini?.content.concat(content) || [];
      return {
        ...state,
        storeMini: payload,
        pageStoreMini: state.pageStoreMini + UNIT_INCREASE,
        hasLoadMoreStoreMini: state.pageStoreMini + 1 < totalPages,
      };
    },
    [types.GET_STORE_MINI_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },

    [types.ADD_NEW_FEED_STORE]: (state, {payload}) => {
      return {...state, newFeedStoreSelect: payload};
    },
    [types.REMOVE_NEW_FEED_STORE]: (state, {payload}) => {
      return {...state, newFeedStoreSelect: {}};
    },

    [types.SET_LOCAL_FOLLOWED_STORE]: (state, {payload}) => {
      return {...state, localFollowedStore: payload};
    },
    [types.SET_LOCAL_FOLLOWED_USER]: (state, {payload}) => {
      return {...state, localFollowedUser: payload};
    },
  },
  intialState,
);
