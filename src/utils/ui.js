import {Platform, Dimensions} from 'react-native';

const dim = Dimensions.get('window');

export const isIPhoneXSize = () => dim.height === 812 || dim.width === 812;

export const isIPhoneXrSize = () => dim.height === 896 || dim.width === 896;

export const isIPhone12Size = () => dim.height === 844 || dim.width === 844;

export const isIphoneX = () =>
  Platform.OS === 'ios' &&
  (isIPhoneXSize() || isIPhoneXrSize() || isIPhone12Size());
