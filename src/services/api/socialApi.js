import {_fetch} from '../config';
import {POST, PUT, GET} from 'constants';

export const follow = (payload) => {
  return _fetch(POST, '/user-followers/follow', payload);
};

export const unfollow = (payload) => {
  return _fetch(PUT, '/user-followers/unfollow', payload);
};

export const like = (payload) => {
  return _fetch(POST, '/user-likes/like', payload);
};

export const unlike = (payload) => {
  return _fetch(PUT, '/user-likes/unlike', payload);
};

export const loadListLiked = (payload) => {
  return _fetch(POST, '/user-followers​/load-status-follow', payload);
};

export const loadListFlollowed = (payload) => {
  return _fetch(POST, '/user-likes/load-status-like', payload);
};

export const countLike = (payload) => {
  return _fetch(GET, '/user-likes/count', payload);
};
