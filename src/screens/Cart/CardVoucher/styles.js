import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  containerVoucher: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapVoucher: {
    width: width - 30,
    height: 150,
    backgroundColor: '$white',
    borderRadius: 8,
  },
  circleVoucherLeft: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    left: -25,
    top: 60,
    backgroundColor: '$bgColorTwo',
  },
  circleVoucherRight: {
    position: 'absolute',
    right: -25,
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 60,
    backgroundColor: '$bgColorTwo',
  },
});
