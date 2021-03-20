import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  viewImage: {
    width: (width - 48) / 2,
    marginHorizontal: 8,
  },
  info: {
    paddingTop: 12,
  },
  name: {
    fontSize: 13,
    fontFamily: '$font1',
    width: '90%',
    height: 38,
  },
  price: {
    lineHeight: 24,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
  },
  likeIcon: {
    ...absolute(null, 0, null, 0),
    zIndex: 99,
  },
});
