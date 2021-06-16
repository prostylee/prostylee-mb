import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow} from 'theme/style';
import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width} = Dimensions.get('window');

const WIDTH_HEADER = width;
const HEIGHT_HEADER = 50 + getStatusBarHeight();

export default EStyleSheet.create({
  container: {
    width: WIDTH_HEADER,
    height: HEIGHT_HEADER,
    borderBottomWidth: 1,
    position: 'absolute',
    zIndex: 100,
    top: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  left: {
    justifyContent: 'center',
    width: 80,
  },
  mid: {
    width: WIDTH_HEADER - 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'center',
    width: 80,
  },
  mid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
    width: 80,
  },
  rightHeader: {
    ...flexRow,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width / 3,
    paddingLeft: 12,
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
    padding: 2,
  },
  grayBg: {
    backgroundColor: '#333',
  },
  headerUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelUserName: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});
