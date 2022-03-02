import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absoluteCenter, absolute, center, flexRow} from 'theme/style';
import {IMG_STATUS} from 'constants';

const {width} = Dimensions.get('window');
const widthCenter = width / 2 - 40;

export default EStyleSheet.create({
  viewInfo: {
    backgroundColor: '$white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 99,
  },
  infoTop: {
    paddingLeft: 20,
    paddingRight: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textDescriptionContainer: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  textName: {
    textAlign: 'left',
    fontFamily: '$font1',
    fontWeight: '700',
    lineHeight: 28,
    fontSize: 17,
    color: '#333333',
  },
  textDescription: {
    textAlign: 'left',
    lineHeight: 20,
    fontSize: 14,
    color: '#333333',
    paddingTop: 6,
  },
  actions: {
    ...center,
    ...flexRow,
    paddingTop: 16,
    paddingHorizontal: 20,
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
    flex: 1,
    height: 36,
    width: '100%',
    paddingHorizontal: 0,
    backgroundColor: '$purple',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  followBtnContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followBtnLabel: {
    marginVertical: 0,
    width: '100%',
    fontFamily: '$font1',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 0,
  },
  followedBtnLabel: {
    color: '$black',
  },
  messageBtn: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '$black600',
    marginLeft: 6,
  },
  messageBtnLabel: {
    color: '$black',
    fontFamily: '$font1',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  statisticalView: {
    ...flexRow,
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 12,
  },
  viewSection: {
    ...center,
    flex: 1,
    paddingHorizontal: 4,
  },
  textLabel: {
    fontFamily: '$font1',
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    height: 30,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: '$font1',
  },
  followedBtn: {
    backgroundColor: '$white',
    borderWidth: 1,
    borderColor: '$black600',
  },
});
