import {_fetch} from '../config';
import {GET} from 'constants';

export const getParentCategories = (payload) => {
  return _fetch(GET, '/categories', {...payload, parentId: 0, sorts: '+order'});
};

export const getChildCategories = (payload) => {
  return _fetch(GET, '/categories', {...payload, sorts: '+order'});
};
