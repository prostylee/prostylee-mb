import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow} from 'theme/style';
import {Platform} from 'react-native';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  title: {
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: '$font1',
    letterSpacing: -0.02,
  },
  rightHeader: {
    ...flexRow,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
    paddingRight: 0,
  },
  touch: {
    paddingHorizontal: 8,
  },
  midHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: -4,
  },
  leftHeader: {
    justifyContent: 'center',
    paddingLeft: 20,
    width: 80,
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
