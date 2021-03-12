import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow, center} from 'theme/style';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  leftTouch: {
    paddingLeft: 20,
  },
  rightView: {
    ...flexRow,
    paddingRight: 20,
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
});
