import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: width,
    padding: 16,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
  },
  bookmark: {
    height: 36,
    paddingLeft: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    lineHeight: 24,
    color: '$black',
  },
  priceOriginal: {
    fontSize: 13,
    lineHeight: 18,
    color: '$lightGray',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateNumber: {
    fontSize: 11,
    lineHeight: 16,
    color: '$lightGray',
    paddingLeft: 4,
  },
});
