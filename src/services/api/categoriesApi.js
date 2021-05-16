import {_fetch} from '../config';
import {GET} from 'constants';

export const getParentCategories = (payload) => {
  return _fetch(GET, '/categories', {...payload, parentId: 0, sort: 'name'});
};
