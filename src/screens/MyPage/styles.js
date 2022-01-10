import EStyleSheet from 'react-native-extended-stylesheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions, Platform} from 'react-native';
import {flexRow} from 'theme/style';

const barHeight = getStatusBarHeight();
const {height, width} = Dimensions.get('window');
const TABS_HEIGHT = 45;
const HEIGHT_HEADER = 50 + getStatusBarHeight();
const ANDROID_HEADER = Platform.OS === 'ios' ? getStatusBarHeight() + 10 : -16;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 10,
    width: '100%',
  },
  headerTitle: {
    fontFamily: '$font1',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    flex: 1,
  },
  rightHeader: {
    ...flexRow,
    width: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
  },

  backgroundImageStyle: {
    width: 500,
    height: 500,
    top: 0,
    alignSelf: 'center',
    backgroundColor: '$lightGray',
  },
  wrapAvatar: {
    marginBottom: -40,
    zIndex: 10,
  },
  avatarStyle: {
    alignSelf: 'center',
  },
  scrollViewStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewInfoUser: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '$white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: width,
  },

  followParentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    paddingTop: 24,
    paddingBottom: 24,
  },
  followChildView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueFollowChild: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  labelFollowChild: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  viewType: {
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '$white',
    width: 80,
    bottom: 7,
    position: 'absolute',
    zIndex: 99,
  },
  // headerProfile: {
  //   flexDirection: 'column',
  //   backgroundColor: '$white',
  //   flex: 1,
  // },
  // headerFull: {
  //   position: 'absolute',
  //   top: barHeight,
  //   zIndex: 100,
  //   right: 20,
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingTop: 12,
  // },
  // wrapTabView: {
  //   height: height - TABS_HEIGHT - HEIGHT_HEADER - ANDROID_HEADER,
  // },
  userNameText: {
    marginTop: 56,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
  viewScroll: {
    flex: 1,
    flexDirection: 'column',
    width: width,
  },
  wrapScroll: {
    flex: 1,
  },
  editButton: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  editLabelButton: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
