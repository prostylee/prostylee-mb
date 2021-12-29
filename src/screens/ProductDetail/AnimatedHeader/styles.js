import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width: WIDTH_HEADER} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: WIDTH_HEADER,
    height: 50 + getStatusBarHeight() + (Platform.OS === 'ios' ? 0 : 36),
    paddingTop: getStatusBarHeight(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  headerTop: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: WIDTH_HEADER,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  headerTopPlaceholder: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: WIDTH_HEADER,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  backButton: {
    width: 80,
    height: 50,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButtonBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A3A3A3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCenterImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 20,
    // borderWidth:1,
  },
  centerImgStyle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  rightIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
  },
  bagIcon: {
    height: 50,
    paddingLeft: 16,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsisIcon: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //TabNav style

  containerTabNav: {
    height: 36 + 50 + (Platform.OS === 'ios' ? getStatusBarHeight() : 0),
    paddingTop: 50 + (Platform.OS === 'ios' ? getStatusBarHeight() : 0),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '$white',
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
  },
  tabButton: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '$purple',
  },
  tabButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
  },
  tabButtonTextActive: {
    color: '$purple',
  },
  //Menu style
  menuContainer: {
    // position: 'absolute',
    top: 50 + getStatusBarHeight(),
    // right: 0,
    maxWidth: WIDTH_HEADER * 0.5,
  },
  topItemContainer: {
    paddingBottom: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
  },
  bottomItemContainer: {
    paddingTop: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
  },
});
