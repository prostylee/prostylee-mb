import {emailRegex} from 'utils/common';
import _ from 'lodash';
import I18n from 'i18n';
import {fullNameRegex, passwordRegex} from './common';

export const validateEmail = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {field: I18n.t('user.email')});
  } else if (emailRegex.test(value) === false) {
    error = I18n.t('validation.invalid', {field: I18n.t('user.email')});
  }
  return error;
};

export const validatePhone = (value) => {
  return '';
};

export const validatePassword = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {field: I18n.t('user.password')});
  } else if (passwordRegex.test(value) === false) {
    error = I18n.t('validation.invalid', {field: I18n.t('user.password')});
  }
  return error;
};

export const validateFullname = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {field: I18n.t('user.name')});
  } else if (fullNameRegex.test(value) === false) {
    error = I18n.t('validation.invalid', {field: I18n.t('user.name')});
  }
  return error;
};
