const DEV = true;
//domain dùng cho việc hiển thị ảnh trên app
const domain_url_live = 'https://prostylee.vn';
const domain_url_dev = 'http://52.77.35.71:8090';
export const domain_url = DEV === true ? domain_url_dev : domain_url_live;

//url api
const api_url_live = 'https://prostylee.vn/api';
const api_url_dev = 'http://52.77.35.71:8090/api/v1';
export const api_url = DEV === true ? api_url_dev : api_url_live;

export const errMsg = 'Đã xảy ra lỗi, vui lòng thử lại sau';
export const networkErr = 'Không có kết nối mạng';
export const sessionExpired = 'Phiên đăng nhập hết hạn';

export const SERVER_FIREBASE_KEY = '';
export const GOOGLE_API_KEY = '';
