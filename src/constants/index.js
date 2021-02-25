import I18n from 'i18n';

//API STATUS
export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const SESSION_EXPIRED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;

//TIME OUT
export const TIME_OUT = 20000;

// HTTP METHODS
export const POST = 'post';
export const GET = 'get';
export const PUT = 'put';
export const DELETE = 'delete';

//ERROR MESSAGE
export const UNKNOWN_MESSAGE = I18n.t('unknownMessage');
export const DISCONNECT = I18n.t('disconnected');
export const SESSION_EXPIRED_MESSAGE = I18n.t('sessionExpiredMessage');

// TARGET TYPE
export const TYPE_STORE = 'STORE';
export const TYPE_USER = 'USER';

// PARAM QUERY
export const PAGE_DEFAULT = 0;
export const LIMIT_DEFAULT = 12;
export const NUMBER_OF_PRODUCT = 3;
