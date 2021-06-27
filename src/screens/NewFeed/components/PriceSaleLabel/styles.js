import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';

export default EStyleSheet.create({
  discountPercent: {
    ...absolute(null, 8, 8, null),
    padding: 6,
    borderRadius: 4,
    backgroundColor: '$red',
  },
  textDiscount: {
    color: '$white',
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
  },
});
