import {Dimensions} from 'react-native';
import {
  getDeviceId,
  getDeviceName,
  getSystemName,
  getSystemVersion,
  getManufacturer,
  getBrand,
  getModel,
  isEmulator,
} from 'react-native-device-info';

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
export const fullNameRegex =
  /^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ"+"ụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s]{1,50}$/;
export const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const getDeviceInfo = async () => {
  const device_name = await getDeviceName();
  const device_id = await getDeviceId();
  const device_type = await getSystemName();
  const os_version = await getSystemVersion();
  const manufacturer = await getManufacturer();
  const brand = await getBrand();
  const modal = await getModel();
  const is_emulator = await isEmulator();
  if (is_emulator) {
    return {
      device_name: 'Android Emulator',
      device_id: 'ID01',
      device_type: 'Android',
      os_version: 'Android 11',
      brand: 'Android Emulator',
      manufacturer: 'Google',
      modal: 'Emulator',
    };
  }
  return {
    device_name,
    device_id,
    device_type,
    os_version,
    manufacturer,
    brand,
    modal,
  };
};
