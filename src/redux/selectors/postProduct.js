import {createSelector} from 'reselect';

export const postProductReducer = (state) => state.postProduct;

//List product from categories
export const getPostProductInfoSelector = createSelector(
  postProductReducer,
  (data) => data || {},
);

export const getListAttributesLoadingSelector = createSelector(
  postProductReducer,
  (data) => data.listAttributesLoading || false,
);
export const getListAttributesSelector = createSelector(
  postProductReducer,
  (data) => data.listAttributes || [],
);
export const getProductStatus = createSelector(
  postProductReducer,
  (data) => data.listProductStatus || [],
);

//Payment method
export const getProductPaymentMethodSelector = createSelector(
  postProductReducer,
  (data) => data.listPaymentMethod || [],
);
export const getProductPaymentMethodLoadingSelector = createSelector(
  postProductReducer,
  (data) => data.listPaymentMethodLoading || false,
);

// Delivery type
export const getProductDeliveryTypeSelector = createSelector(
  postProductReducer,
  (data) => data.listDeliveryType || [],
);
export const getProductDeliveryTypeLoadingSelector = createSelector(
  postProductReducer,
  (data) => data.listDeliveryTypeLoading || false,
);

//List Location

export const getProductLocationSelector = createSelector(
  postProductReducer,
  (data) => data.listLocation || [],
);
export const getProductLocationLoadingSelector = createSelector(
  postProductReducer,
  (data) => data.listLocationLoading || false,
);
