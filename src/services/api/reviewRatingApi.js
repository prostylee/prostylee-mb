import {_fetch} from '../config';
import {GET} from 'constants';

export const getAverage = (payload) => {
  return _fetch(GET, '/v1/user-rating-controller/average', payload);
};

export const getListReview = (payload) => {
  return _fetch(GET, '/v1/user-rating-controller/getAll_16', payload);
};

export const filterReview = (payload) => {
  return _fetch(
    GET,
    '/v1/swagger-ui/index.html#/user-rating-controller/getAll_12',
    payload,
  );
};

export const filterReview = (payload) => {
  return _fetch(
    GET,
    '/v1/swagger-ui/index.html#/user-rating-controller/getAll_12',
    payload,
  );
};

export const addReview = (payload) => {
  return _fetch(
    GET,
    '/swagger-ui/index.html#/user-rating-controller/create_12',
    payload,
  );
};
