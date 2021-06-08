import EStyleSheet from 'react-native-extended-stylesheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions} from 'react-native';
const barHeight = getStatusBarHeight();
const {height} = Dimensions.get('window');
const HEADER_HEIGHT = 150;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  backgroundImageStyle: {
    width: 500,
    height: 500 - 80,
    top: 0,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
  },
  avatarStyle: {
    top: HEADER_HEIGHT - 40,
    zIndex: 10,
    alignSelf: 'center',
  },
  scrollViewStyle: {
    top: HEADER_HEIGHT,
    backgroundColor: '$white',
    alignSelf: 'stretch',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginTop: -80,
  },
  followParentView: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  followChildView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  headerProfile: {
    flexDirection: 'column',
    backgroundColor: '$white',
    marginTop: -barHeight,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },
  headerFull: {
    position: 'absolute',
    top: barHeight,
    zIndex: 11,
    right: 7,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapTabView: {
    height: height - HEADER_HEIGHT - 50,
  },
});
