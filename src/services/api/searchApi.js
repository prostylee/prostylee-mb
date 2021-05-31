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
