import {createSelector} from 'reselect';

export const postProductReducer = (state) => state.product;

//List product from categories
export const getPostProductInfoSelector = createSelector(
  postProductReducer,
  (data) => data?.postProduct,
);
