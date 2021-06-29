import {createAction, handleActions} from 'redux-actions';

export const types = {
  // Prefecture
  GET_PREFECTURE_LOADING: 'GET_PREFECTURE_LOADING',
  GET_PREFECTURE: 'GET_PREFECTURE',
  GET_PREFECTURE_SUCCESS: 'GET_PREFECTURE_SUCCESS',
  GET_PREFECTURE_FAIL: 'GET_PREFECTURE_FAIL',
  // District
  GET_DISTRICT_LOADING: 'GET_DISTRICT_LOADING',
  GET_DISTRICT: 'GET_DISTRICT',
  GET_DISTRICT_SUCCESS: 'GET_DISTRICT_SUCCESS',
  GET_DISTRICT_FAIL: 'GET_DISTRICT_FAIL',
  // Ward
  GET_WARD_LOADING: 'GET_WARD_LOADING',
  GET_WARD: 'GET_WARD',
  GET_WARD_SUCCESS: 'GET_WARD_SUCCESS',
  GET_WARD_FAIL: 'GET_WARD_FAIL',
};

export const actions = {
  // Prefecture
  getPrefectureLoading: createAction(types.GET_PREFECTURE_LOADING),
  getPrefecture: createAction(types.GET_PREFECTURE),
  getPrefectureSuccess: createAction(types.GET_PREFECTURE_SUCCESS),
  getPrefectureFail: createAction(types.GET_PREFECTURE_FAIL),

  // District
  getDistrictLoading: createAction(types.GET_DISTRICT_LOADING),
  getDistrict: createAction(types.GET_DISTRICT),
  getDistrictSuccess: createAction(types.GET_DISTRICT_SUCCESS),
  getDistrictFail: createAction(types.GET_DISTRICT_FAIL),

  // Ward
  getWardLoading: createAction(types.GET_WARD_LOADING),
  getWard: createAction(types.GET_WARD),
  getWardSuccess: createAction(types.GET_WARD_SUCCESS),
  getWardFail: createAction(types.GET_WARD_FAIL),
};

export const selectors = {
  getPrefecture: (state) => state.address.prefecture,
  getPrefectureLoading: (state) => state.address.prefectureLoading,

  getDistrict: (state) => state.address.district,
  getDistrictLoading: (state) => state.address.districtLoading,

  getWard: (state) => state.address.ward,
  getWardLoading: (state) => state.address.wardLoading,
};

const intialState = {
  // Prefecture
  prefectureLoading: false,
  prefecture: [],

  // District
  districtLoading: false,
  district: [],

  // Ward
  wardLoading: false,
  ward: [],
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

    // District
    [types.GET_DISTRICT_LOADING]: (state, {payload}) => {
      return {...state, districtLoading: payload};
    },
    [types.GET_DISTRICT_SUCCESS]: (state, {payload}) => {
      return {...state, district: payload};
    },
    [types.GET_DISTRICT_FAIL]: (state, {payload}) => {
      return {...state, district: []};
    },

    // Ward
    [types.GET_WARD_LOADING]: (state, {payload}) => {
      return {...state, wardLoading: payload};
    },
    [types.GET_WARD_SUCCESS]: (state, {payload}) => {
      return {...state, ward: payload};
    },
    [types.GET_WARD_FAIL]: (state, {payload}) => {
      return {...state, ward: []};
    },
  },
  intialState,
);
