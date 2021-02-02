import apisauce from 'apisauce';

import {api_url} from '../config';

var config = {
  url: api_url,
  baseURL: api_url,
  timeout: 20000,
};

export const api = apisauce.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

async function _fetch(method, path, data) {
  return api[method](path, data).then((res) => {
    if (res && res.status === 401) {
      let response = {
        status: res.status,
        errors: ['Phiên đăng nhập hết hạn'],
      };
      return {ok: true, data: response};
    } else {
      return {ok: true, data: res.data};
    }
  });
}

export const setHeadersRequest = async (headers) => {
  api.setHeaders(headers);
};

//AUTH API
export const userSignUp = (payload) => {
  return _fetch('post', '/signup', {
    name: payload.fullname,
    password: payload.password,
    email: payload.email,
    city_id: payload.city_id,
    code: payload.code,
    phone: payload.phone_number,
  });
};

export const userLogin = (payload) => {
  console.log(payload);
  return _fetch('post', '/login', {
    email: payload.email,
    password: payload.password,
    remember_me: true,
  });
};

export const checkEmailExisted = (email) => {
  return _fetch('get', '/email', {email});
};

export const signUpGetEmailCode = (email) => {
  return _fetch('post', '/emailRegister', {email});
};

export const signUpCheckEmailCode = (payload) => {
  return _fetch('post', '/acceptRegisterCode', {
    email: payload.email,
    code: payload.code,
  });
};

export const getUserInfo = () => {
  return _fetch('get', '/user');
};

export const getProvinceList = () => {
  return _fetch('get', '/city/list');
};

export const userLogout = () => {
  return _fetch('post', '/logout');
};
