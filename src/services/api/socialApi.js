import {_fetch, api} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

export const follow = (payload) => {
  return _fetch(POST, '/user-followers/follow', payload);
};

export const unfollow = (payload) => {
  return _fetch(PUT, '/user-followers/unfollow', payload);
};

export const like = (payload) => {
  return _fetch(PUT, '/user-likes/like', payload);
};

export const unlike = (payload) => {
  return _fetch(PUT, '/user-followers/unlike', payload);
};
