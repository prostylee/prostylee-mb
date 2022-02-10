import {emailRegex} from 'utils/common';
import _ from 'lodash';
import I18n from 'i18n';
import {
  fullNameRegex,
  passwordRegex,
  phoneRegex,
  userNameRegex,
} from './common';

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
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {field: I18n.t('user.phone')});
  } else if (phoneRegex.test(value) === false) {
    error = I18n.t('validation.invalid', {field: I18n.t('user.phone')});
  }
  return error;
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

export const validateUsername = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {field: I18n.t('user.username')});
  } else if (userNameRegex.test(value) === false) {
    error = I18n.t('validation.invalid', {field: I18n.t('user.username')});
  }
  return error;
};

export const validatePrefecture = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {
      field: I18n.t('settingAddress.province'),
    });
  }
  return error;
};

export const validateDistrict = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {
      field: I18n.t('settingAddress.district'),
    });
  }
  return error;
};
export const validateWard = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {
      field: I18n.t('settingAddress.ward'),
    });
  }
  return error;
};
export const validateAddress = (value) => {
  let error = '';
  if (_.isEmpty(value)) {
    error = I18n.t('validation.required', {
      field: I18n.t('settingAddress.detailAddress'),
    });
  }
  return error;
};
