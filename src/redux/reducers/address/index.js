import {createAction, handleActions} from 'redux-actions';

export const types = {
  // Prefecture
  GET_PREFECTURE_LOADING: 'GET_PREFECTURE_LOADING',
  GET_PREFECTURE: 'GET_PREFECTURE',
  GET_PREFECTURE_SUCCESS: 'GET_PREFECTURE_SUCCESS',
  GET_PREFECTURE_FAIL: 'GET_PREFECTURE_FAIL',
};

export const actions = {
  // Prefecture
  getPrefectureLoading: createAction(types.GET_PREFECTURE_LOADING),
  getPrefecture: createAction(types.GET_PREFECTURE),
  getPrefectureSuccess: createAction(types.GET_PREFECTURE_SUCCESS),
  getPrefectureFail: createAction(types.GET_PREFECTURE_FAIL),
};

export const selectors = {
  getPrefecture: (state) => state.address.prefecture,
  getPrefectureLoading: (state) => state.address.prefectureLoading,
};

const intialState = {
  // Prefecture
  prefectureLoading: false,
  prefecture: [],
};

export default handleActions(
  {
    // Prefecture
    [types.GET_PREFECTURE_LOADING]: (state, {payload}) => {
      return {...state, prefectureLoading: payload};
    },
    [types.GET_PREFECTURE_SUCCESS]: (state, {payload}) => {
      return {...state, prefecture: payload};
    },
    [types.GET_PREFECTURE_FAIL]: (state, {payload}) => {
      return {...state, prefecture: []};
    },
  },
  intialState,
);
