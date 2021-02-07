import {_fetch, api} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

export const getNewFeed = (payload) => {
  api.setHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjIwLFwiZnVsbE5hbWVcIjpcIlN1cGVyIEFkbWluXCIsXCJ1c2VybmFtZVwiOlwic3VwZXJhZG1pbjFAZ21haWwuY29tXCIsXCJwaG9uZU51bWJlclwiOlwiMDkwMDAwMDAwM1wiLFwiZ2VuZGVyXCI6XCJNXCIsXCJyb2xlc1wiOltcIlNVUEVSX0FETUlOXCJdLFwiZmVhdHVyZXNcIjpbXX0iLCJzY29wZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczovL3Byb3N0eWxlZS52bi8iLCJpYXQiOjE2MTI2ODA3MzcsImV4cCI6MTYxMjY5NTEzN30.CxkTaU5-ptj2HuezoRYcdG0KaMPRIjsro3L68-yIPS6371d2vMqgbqo2BYLSF9_nQhMR85PmOV8pdKYQOwhviw')
  return _fetch(GET, '/products/new-feeds', payload);
};
