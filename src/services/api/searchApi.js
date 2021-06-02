import {_fetch} from '../config';
import {POST, GET} from 'constants';

export const getListFeaturedCategoriesService = (payload) => {
  return _fetch(GET, '/categories', {
    ...payload,
    hotStatus: true,
    sort: 'name',
  });
};

export const getListTopSearchService = (payload) => {
  return _fetch(GET, '/suggestions/keywords/top', {
    ...payload,
  });
};

export const getSuggestionsSearchService = (payload) => {
  return _fetch(GET, '/suggestions/keywords/hint', {
    ...payload,
  });
};
export const getFeaturedProductSearchApi = (payload) => {
  return _fetch(GET, '/products/best-seller', {
    ...payload,
  });
};

export const getStoreResultsApi = (payload) => {
  return _fetch(GET, '/stores', {
    ...payload,
  });
};
export const getStoreBestSellerProduct = (payload) => {
  return _fetch(GET, '/products/best-seller', {
    ...payload,
  });
};
export const getProductSearchResultsApi = (payload) => {
  return _fetch(GET, '/products', {
    ...payload,
  });
};
export const getProductAttributesFilterResultsApi = (payload) => {
  return _fetch(GET, '/attributes', {
    ...payload,
  });
};
