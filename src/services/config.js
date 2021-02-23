import apisauce from 'apisauce';

import configEnv from 'config';
import {TIME_OUT} from 'constants';
var config = {
  url: configEnv.api_url,
  baseURL: configEnv.api_url,
  timeout: TIME_OUT,
};

export const api = apisauce.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

api.setHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjIsXCJmdWxsTmFtZVwiOlwiVGVzdCBVc2VyIDJcIixcInVzZXJuYW1lXCI6XCJ0ZXN0dXNlcjNAZ21haWwuY29tXCIsXCJwaG9uZU51bWJlclwiOlwiMDkwMDAwMDAwM1wiLFwiZ2VuZGVyXCI6XCJNXCIsXCJyb2xlc1wiOltdLFwiZmVhdHVyZXNcIjpbXX0iLCJzY29wZXMiOltdLCJpc3MiOiJodHRwczovL3Byb3N0eWxlZS52bi8iLCJpYXQiOjE2MTQwODU5NTksImV4cCI6MTYxNDEwMDM1OX0.tLWBPqDss25WY2n1HP_NoqfycVnwzSsZQbM4cJ2KpnB8JGRbkwC_y9kuZ3KCBHuvVtWZMpen-Ev16wnNZmP65g')

export async function _fetch(method, path, data) {
  return api[method](path, data).then((res) => {
    return {ok: true, data: res.data};
  });
}

export const setHeadersRequest = async (headers) => {
  api.setHeaders(headers);
};
