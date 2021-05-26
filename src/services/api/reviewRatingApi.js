import {_fetch} from '../config';
import {GET, POST} from 'constants';

export const getAverage = (productId) => {
  return _fetch(
    GET,
    `/user-ratings/average?targetId=${productId}&targetType=PRODUCT`,
  );
};

export const getListReviewRatingService = (payload) => {
  return _fetch(GET, `/user-ratings`, payload);
};

export const sortReview = (productId, order) => {
  return _fetch(
    GET,
    `/user-ratings?targetId=${productId}&targetType=PRODUCT&sorts=${
      order === 1 ? 'createdAt' : '-createdAt'
    }`,
    payload,
  );
};

export const filterReview = (productId, star) => {
  return _fetch(
    GET,
    `/user-ratings?targetId=${productId}&targetType=PRODUCT&value=${star}`,
    payload,
  );
};

export const addReview = (body) => {
  return _fetch(POST, '/user-ratings', body);
};
