import {Dimensions} from 'react-native';

export const dim = Dimensions.get('window');

//IPHONE 6 SCREEN RESOLUTION
const baseWidth = 375;
const baseHeight = 667;

const baseAvg = (baseWidth + baseHeight) / 2;
const screenAvg = (dim.width + dim.height) / 2;

export const rem = screenAvg / baseAvg;

export const formatVND = (num) => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const getFirstLetter = (str) => {
  if (str && typeof str === 'string' && str.length > 0) {
    return str[0].toUpperCase();
  } else {
    return null;
  }
};

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = /^.{8,50}$/;
export const fullNameRegex = /^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ"+"ụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s]{1,50}$/;
