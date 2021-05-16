import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absoluteCenter, absolute, center, flexRow} from 'theme/style';
import {IMG_STATUS} from 'constants';

const {width} = Dimensions.get('window');
const widthCenter = width / 2 - 40;

export default EStyleSheet.create({
  viewBg: {
    height: Platform.OS === 'ios' ? 420 : 400,
  },
  overlay: {
    ...absoluteCenter,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewInfo: {
    ...absolute((width * IMG_STATUS) / 3.6, 0, 0, 0),
    backgroundColor: '$white',
    borderBottomWidth: 1,
    borderBottomColor: '$line',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 99,
  },
  avatar: {
    ...absolute(-40, null, widthCenter, widthCenter),
  },
  viewArea: {
    marginTop: 56,
  },
  textName: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
    textAlign: 'center',
  },
  textDescription: {
    paddingHorizontal: 32,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 20,
  },
  actions: {
    ...center,
    ...flexRow,
  },
  touchMess: {
    padding: 4,
    borderWidth: 1,
    borderColor: '$purple',
    borderRadius: 4,
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  followBtn: {
    height: '28rem',
    backgroundColor: '$purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticalView: {
    ...flexRow,
    ...absolute(null, 24, 0, 0),
    justifyContent: 'space-around',
  },
  viewSection: {
    ...center,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
    paddingVertical: 8,
    marginRight: 16,
  },
  followedBtn: {
    backgroundColor: '$disabled',
  },
});
