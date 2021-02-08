import {_fetch} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

//AUTH API
export const userSignUp = (payload) => {
  console.log({payload});
  return _fetch(POST, '/auth/sign-up', payload);
};

export const userLogin = (payload) => {
  return _fetch(POST, '/auth/sign-in', payload);
};

export const userRefreshToken = (payload) => {
  return _fetch(POST, '/auth/refresh', payload);
};

export const userForgotPassword = (payload) => {
  return _fetch(POST, '/auth/forgot-password', payload);
};

export const userVerifyOTP = (payload) => {
  return _fetch(POST, '/auth/verify-otp', payload);
};

export const userChangePassword = (payload) => {
  console.log({payload});
  return _fetch(PUT, '/auth/change-password', payload);
};
