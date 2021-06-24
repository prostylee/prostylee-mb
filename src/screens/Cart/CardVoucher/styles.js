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
    padding: 16,
  },
  circleVoucherLeft: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20,
    left: -10,
    top: 70,
    backgroundColor: '$bgColorTwo',
  },
  circleVoucherRight: {
    position: 'absolute',
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 20,
    top: 70,
    backgroundColor: '$bgColorTwo',
  },
});
