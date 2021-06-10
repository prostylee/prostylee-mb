import {createSelector} from 'reselect';

export const postProductReducer = (state) => state.postProduct;

//List product from categories
export const getPostProductInfoSelector = createSelector(
  postProductReducer,
  (data) => data,
);
