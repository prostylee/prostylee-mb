import {createSelector} from 'reselect';

export const myPageReducer = (state) => state.myPage;

//List cancel orders
export const getListCanceledOrdersLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listCanceledOrdersLoading,
);

export const getListCanceledOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listCanceledOrders || {},
);

export const getListCanceledOrdersLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listCanceledOrdersLoadmoreLoading || false,
);

export const getHasLoadMoreCanceledOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListCanceledOrdersLoadmore || false,
);

export const getPageCanceledOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listCanceledOrdersCurrentPage || 0,
);
//List completed orders
export const getListCompletedOrdersLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listCompletedOrdersLoading,
);

export const getListCompletedOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listCompletedOrders || {},
);

export const getListCompletedOrdersLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listCompletedOrdersLoadmoreLoading || false,
);

export const getHasLoadMoreCompletedOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListCompletedOrdersLoadmore || false,
);

export const getPageCompletedOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listCompletedOrdersCurrentPage || 0,
);
//List created orders
export const getListCreatedOrdersLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listCreatedOrdersLoading,
);

export const getListCreatedOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listCreatedOrders || {},
);

export const getListCreatedOrdersLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listCreatedOrdersLoadmoreLoading || false,
);

export const getHasLoadMoreCreatedOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListCreatedOrdersLoadmore || false,
);

export const getPageCreatedOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listCreatedOrdersCurrentPage || 0,
);
//List good issues orders
export const getListGoodIssuesOrdersLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listGoodIssuesOrdersLoading,
);

export const getListGoodIssuesOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listGoodIssuesOrders || {},
);

export const getListGoodIssuesOrdersLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listGoodIssuesOrdersLoadmoreLoading || false,
);

export const getHasLoadMoreGoodIssueOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListGoodIssuesOrdersLoadmore || false,
);

export const getPageGoodIssueOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listGoodIssuesOrdersCurrentPage || 0,
);
//List on delivery orders
export const getListOnDeliveryOrdersLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listOnDeliveryOrdersLoading,
);

export const getListOnDeliveryOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listOnDeliveryOrders || {},
);

export const getListOnDeliveryOrdersLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listOnDeliveryOrdersLoadmoreLoading || false,
);

export const getHasLoadMoreOnDeliveryOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListOnDeliveryOrdersLoadmore || false,
);

export const getPageOnDeliveryOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listOnDeliveryOrdersCurrentPage || 0,
);
//List received orders
export const getListReceiveOrdersLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listReceiveOrdersLoading,
);

export const getListReceiveOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listReceiveOrders || {},
);

export const getListReceiveOrdersLoadmoreLoadingSelector = createSelector(
  myPageReducer,
  (data) => data?.listReceiveOrdersLoadmoreLoading || false,
);

export const getHasLoadMoreReceiveOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.hasListReceiveOrdersLoadmore || false,
);

export const getPageReceiveOrdersSelector = createSelector(
  myPageReducer,
  (data) => data?.listReceiveOrdersCurrentPage || 0,
);
