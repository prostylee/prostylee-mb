import {call, put, takeLatest, select} from 'redux-saga/effects';

import {cartActions, cartTypes} from 'reducers';
import {getProductVarient} from 'utils/product';

import {
  getPaymentMethods,
  getRecentViewList,
  getSuggestionsList,
  getVoucherList,
  getDeliveryMethods,
  getUserAddress,
  createOrders as createOrdersApi,
} from 'services/api/cartApi';

import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
//List Cart
const setListCart = function* ({payload}) {
  try {
    yield put(cartActions.setCartLoading(true));
    yield put(cartActions.setListCartSuccess(payload));
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setCartLoading(false));
  }
};

const getListPayment = function* ({payload}) {
  try {
    yield put(cartActions.setCartLoading(true));
    const res = yield call(getPaymentMethods, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListPaymentSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListPaymentFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setCartLoading(false));
  }
};

const getListRecent = function* ({payload}) {
  try {
    yield put(cartActions.setRecentLoading(true));
    const res = yield call(getRecentViewList, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListRecentSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListRecentFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setRecentLoading(false));
  }
};

const getListSuggestion = function* ({payload}) {
  try {
    yield put(cartActions.setSuggestionLoading(true));
    const res = yield call(getSuggestionsList, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListSuggestionSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListSuggestionFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setSuggestionLoading(false));
  }
};

//List Voucher
const getListVoucher = function* ({payload}) {
  try {
    yield put(cartActions.setVoucherLoading(true));
    yield put(cartActions.setPageVoucherDefault());
    const res = yield call(getVoucherList, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListVoucherSuccess(res.data.data));
    } else {
      yield put(cartActions.getListVoucherFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setVoucherLoading(false));
  }
};

const getLoadMoreListVoucher = function* ({payload}) {
  try {
    yield put(cartActions.setLoadingLoadMoreVoucher(true));
    const res = yield call(getVoucherList, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListVoucherLoadMoreSuccess(res.data.data));
    } else {
      yield put(cartActions.getListVoucherLoadMoreFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setLoadingLoadMoreVoucher(false));
  }
};

const getListDelivery = function* ({payload}) {
  try {
    yield put(cartActions.setDeliveryLoading(true));
    const res = yield call(getDeliveryMethods, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListDeliverySuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListDeliveryFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setDeliveryLoading(false));
  }
};

const getUserCartAddress = function* ({payload}) {
  try {
    yield put(cartActions.setListCartAddressLoading(true));
    const res = yield call(getUserAddress, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(cartActions.getListCartAddressSuccess(res.data.data.content));
    } else {
      yield put(cartActions.getListCartAddressFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.setListCartAddressLoading(false));
  }
};

const createOrder = function* ({payload}) {
  /******** loading ********/
  yield put(cartActions.createOrderLoading(true));
  /******** loading ********/

  const getUserProfile = (state) => state.user.profile;
  const getSelectedAddress = (state) => state.cart.selectedCartAddress;
  const getListCart = (state) => state.cart.listCart;
  const userProfile = yield select(getUserProfile);
  const selectedAddress = yield select(getSelectedAddress);

  const listCartInStore = yield select(getListCart);
  const selectedItems = payload.selectedItems || [];
  const listCart = listCartInStore.filter((item) =>
    selectedItems?.includes(item.productVarient),
  );

  const processCartData = () => {
    return listCart?.length
      ? listCart.map((product) => {
          const productVarient = getProductVarient(product.options);
          const productPrice =
            payload.productVarientPriceData?.[
              `${product.item.id}${productVarient}`
            ] || {};

          return {
            storeId: product.item.storeId,
            branchId: null,
            productId: product.item.id,
            productPrice: productPrice.priceSale
              ? productPrice.priceSale
              : productPrice.price,
            amount: product.quantity,
            productName: product.item.name,
            productImage: product.item.imageUrls?.[0],
            productAttrIds: product.options?.map((item) => item.value.id) || [],
          };
        })
      : [];
  };

  try {
    const orderData = {
      code: null,
      statusId: 0,
      status: 'CREATE_ORDER',
      buyerId: userProfile.id,
      shippingAddress: {
        fullName: selectedAddress.contactName,
        email: userProfile.email,
        phoneNumber: selectedAddress.contactPhone,
        address1: selectedAddress.address,
        address2: selectedAddress.wardCode,
        state: selectedAddress.districtCode,
        city: selectedAddress.cityCode,
        country: null,
        zipcode: null,
      },
      orderDetails: processCartData(),
      // payload
      totalMoney: payload.totalMoney,
      paymentTypeId: payload.paymentTypeId,
      shippingProviderId: payload.shippingProviderId,
      orderDiscounts: [],
    };
    yield put(cartActions.setOrderData(orderData));
    const res = yield call(createOrdersApi, orderData);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      // yield put(cartActions.resetListCart());
      // yield put(cartActions.getListCartAddressSuccess(res.data.data.content));
    } else {
      // yield put(cartActions.getListCartAddressFailed());
    }
  } catch (e) {
    showMessage({
      message: i18n.t('unknownMessage'),
      type: 'danger',
      position: 'top',
    });
  } finally {
    yield put(cartActions.createOrderLoading(false));
  }
};

const watcher = function* () {
  //List Cart
  yield takeLatest(cartTypes.SET_LIST_CART, setListCart);

  //List Payment
  yield takeLatest(cartTypes.GET_LIST_PAYMENT, getListPayment);

  //List Recent
  yield takeLatest(cartTypes.GET_LIST_RECENT, getListRecent);

  //List Suggestion
  yield takeLatest(cartTypes.GET_LIST_SUGGESTION, getListSuggestion);

  //List Voucher
  yield takeLatest(cartTypes.GET_LIST_VOUCHER, getListVoucher);
  yield takeLatest(
    cartTypes.GET_LIST_VOUCHER_LOAD_MORE,
    getLoadMoreListVoucher,
  );

  //List Delivery
  yield takeLatest(cartTypes.GET_LIST_DELIVERY, getListDelivery);
  //List address
  yield takeLatest(cartTypes.GET_LIST_CART_ADDRESS, getUserCartAddress);
  // Create order
  yield takeLatest(cartTypes.CREATE_ORDER, createOrder);
};
export default watcher();
