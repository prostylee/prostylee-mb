import {_fetch} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

//AUTH API
export const userSignUp = (payload) => {
  return _fetch(POST, '/signup', payload);
};

export const userLogin = (payload) => {
  return _fetch(POST, '/login', payload);
};

export const checkEmailExisted = (payload) => {
  return _fetch(GET, '/email', payload);
};
