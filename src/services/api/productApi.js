import {_fetch} from '../config';
import {POST, GET, PUT} from 'constants';

//PRODUCT API
export const getProducts = (payload) => {
  return _fetch(POST, '/product', payload);
};

export const getProductById = (id) => {
  return _fetch(GET, `/products/${id}`);
};

export const getProductCommentsById = (payload) => {
  return _fetch(GET, '/user-ratings', payload);
};

export const getProductCommentsAverage = (payload) => {
  return _fetch(GET, '/user-ratings/average', payload);
};

export const getProductRelated = (payload) => {
  return _fetch(GET, `/products/${payload.id}/related`, {
    newest: payload.newest,
    hot: payload.hot,
  });
};

export const getListProductService = (payload) => {
  return _fetch(GET, '/products', payload);
};

export const likeProductService = (id) => {
  return _fetch(POST, '/user-likes/like', {
    targetId: id,
    targetType: 'PRODUCT',
    customFieldId1: 0,
    customFieldId2: 0,
    customFieldId3: 0,
  });
};

export const unLikeProductService = (id) => {
  return _fetch(PUT, '/user-likes/unLike', {
    targetId: id,
    targetType: 'PRODUCT',
    customFieldId1: 0,
    customFieldId2: 0,
    customFieldId3: 0,
  });
};
