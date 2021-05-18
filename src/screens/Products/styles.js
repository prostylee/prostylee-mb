import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow, center} from 'theme/style';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    paddingBottom: 30,
  },
  leftTouch: {
    paddingLeft: 16,
    fontWeight: '500',
  },
  rightView: {
    ...flexRow,
    paddingRight: 16,
  },
  touchRight: {
    paddingHorizontal: 4,
  },
  mid: {
    ...flexRow,
    ...center,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: '$font1',
    color: '$white',
  },
  imageBanner: {
    width: '100%',
    height: 200,
  },
  wrapProduct: {
    width: '50%',
  },
});
