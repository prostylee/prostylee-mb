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

api.setHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjIwLFwiZnVsbE5hbWVcIjpcIlN1cGVyIEFkbWluXCIsXCJ1c2VybmFtZVwiOlwic3VwZXJhZG1pbjFAZ21haWwuY29tXCIsXCJwaG9uZU51bWJlclwiOlwiMDkwMDAwMDAwM1wiLFwiZ2VuZGVyXCI6XCJNXCIsXCJyb2xlc1wiOltcIlNVUEVSX0FETUlOXCJdLFwiZmVhdHVyZXNcIjpbXX0iLCJzY29wZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczovL3Byb3N0eWxlZS52bi8iLCJpYXQiOjE2MTM4NzM4MTgsImV4cCI6MTYxMzg4ODIxOH0.F6ggAJYwol1T4dihXahJzggOwpPUoZbcdBtZRVUNC31dqlUXKknnb-dxdnuYUlR7hULg_H5K5DyHXO1MvaGpMg')

export async function _fetch(method, path, data) {
  return api[method](path, data).then((res) => {
    return {ok: true, data: res.data};
  });
}

export const setHeadersRequest = async (headers) => {
  api.setHeaders(headers);
};
