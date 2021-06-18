import I18n from 'i18n';

//API STATUS
export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const SESSION_EXPIRED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;
export const POST_SUCCESS = 201;

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
export const SORT_DEFAULT = 'createdAt';

//Story
export const STORY_DURATION = 15;

//IMG SIZE
export const IMG_STATUS = 5 / 4;
export const IMG_PRODUCT = 3 / 2;
export const IMG_RATIO = 4 / 3;
//NEW FEED
export const FIRST_SLICE_ITEM = 3;

//ROLE
export const BUYER = 'BUYER';
// PRODUCT SORT

export const PRODUCT_SORT_ITEM = [
  {label: 'Liên quan nhất', value: 1},
  {label: 'Phổ biến nhất', value: 2},
  {label: 'Hàng mới về', value: 3},
  {label: 'Giá thấp', value: 4},
  {label: 'Giá cao nhất', value: 5},
  {label: 'Đánh giá tốt nhất', value: 6},
];
// VOUCHER SORT
export const VOUCHER_SORT_ITEM = [
  {label: 'Tất cả', value: 0},
  {label: 'Của Prostylee', value: 1},
  {label: 'Của store', value: 2},
  {label: 'Ưu đãi nhất', value: 3},
  {label: 'Sắp hết hạn', value: 4},
  {label: 'Sử dụng nhiều nhất', value: 5},
];

//FILTER TAG

export const FILTER_TAGS = [
  {
    label: 'Best seller',
    value: {
      bestSeller: true,
    },
  },
  {
    label: 'Gần đây',
    value: {
      atitude: 10.806406363857086,
      longitude: 106.6634168400805,
    },
  },
  {
    label: 'Sale',
    value: {
      sale: true,
    },
  },
];
