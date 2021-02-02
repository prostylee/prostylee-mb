import {Dimensions, Platform} from 'react-native';

//IPHONE 6 SCREEN RESOLUTION
const baseWidth = 375;
const baseHeight = 667;

export const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const baseAvg = (baseWidth + baseHeight) / 2;
const screenAvg = (screenWidth + screenHeight) / 2;

export const rem = screenAvg / baseAvg;

export const convertUnixTime = (UNIX_TIMESTAMP) => {
  const a = new Date(UNIX_TIMESTAMP);
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const days = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  let date = a.getDate();
  if (parseInt(date) < 10) {
    date = '0' + date;
  }
  const day = days[a.getDay()];

  const time = `${day}, ${date}/${month}/${year}`;
  return time;
};

export const convertISODate = (isoDate) => {
  let date = new Date(isoDate);
  return (
    checkValue(date.getDate()) +
    '/' +
    checkValue(date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  );
};

export const formatVND = (num) => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const getToday = () => {
  const t = new Date();
  const d = t.getDate();
  const m = t.getMonth() + 1;
  const y = t.getFullYear();
  const today = checkValue(d) + '/' + checkValue(m) + '/' + y;

  return today;
};

const checkValue = (value) => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
};

export const getFirstLetter = (str) => {
  if (str && typeof str === 'string' && str.length > 0) {
    return str[0].toUpperCase();
  } else {
    return null;
  }
};

export const colorApp = '#115e35';

const dim = Dimensions.get('window');

export const isIPhoneXSize = () => dim.height === 812 || dim.width === 812;

export const isIPhoneXrSize = () => dim.height === 896 || dim.width === 896;

export const isIphoneX = () =>
  Platform.OS === 'ios' && (isIPhoneXSize() || isIPhoneXrSize());
