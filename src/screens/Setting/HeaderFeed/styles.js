import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow} from 'theme/style';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  rightHeader: {
    ...flexRow,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: width / 3,
    paddingRight: 12,
  },
  touch: {
    paddingHorizontal: 8,
  },
  midHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
    marginBottom: -4,
  },
  leftHeader: {
    justifyContent: 'center',
    paddingLeft: 20,
    width: width / 3,
  },
  midTouch: {
    padding: 10,
    backgroundColor: '$bgColor',
    borderRadius: 50,
  },
  midBorder: {
    ...flexRow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$bgColor',
    borderRadius: 20,
    padding: 2,
  },
  grayBg: {
    backgroundColor: '#333',
  },
});
